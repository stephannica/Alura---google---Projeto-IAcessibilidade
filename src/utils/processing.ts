import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function fileToGenerativePart(file: File) {
  // Note: Este 'File' é o do NAVEGADOR
  const base64EncodedData = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => console.error("Erro lendo arquivo:", error); // Adicionado log de erro
    reader.readAsDataURL(file);
  });

  // A API espera o base64 SEM o prefixo 'data:image/...;base64,'
  // Verificamos se o resultado é uma string e se contém o prefixo antes de dividir
  const base64 = base64EncodedData.includes(",")
    ? base64EncodedData.split(",")[1]
    : base64EncodedData;

  return {
    inlineData: {
      data: base64,
      mimeType: file.type,
    },
  };
}

export async function processImageForText(
  imageFileBrowser: File
): Promise<string | null> {
  try {
    const imageParts = [await fileToGenerativePart(imageFileBrowser)];

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Extraia todo o texto visível nesta imagem. Retorne apenas o texto extraído, sem formatação adicional ou comentários.",
            },
            ...imageParts,
          ],
        },
      ],
    });

    if (result && result.text) {
      const text = result.text;

      console.log("Texto extraído da imagem:", text);

      return text;
    } else {
      console.log(
        "API não retornou um resultado válido ou texto para a imagem."
      );
      return null;
    }
  } catch (error) {
    console.error("Erro ao processar imagem com IA:", error);
    return null;
  }
}

export async function processLinkForText(url: string): Promise<string | null> {
  try {
    if (!url) {
      console.log("URL vazia, não processando link.");
      return null;
    }

    // Prepara o prompt com a URL
    const promptText = `Leia o conteúdo da página web em ${url} e extraia o texto principal de forma concisa e clara, ignorando menus, rodapés e publicidade.`;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: [{ role: "user", parts: [{ text: promptText }] }],
    });

    if (result && result.text) {
      const text = result.text;

      console.log("Texto extraído do link por Gemini:", text);
      return text;
    } else {
      console.log("API não retornou um resultado válido ou texto para a URL.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao processar link com Gemini:", error);
    return null;
  }
}