// src/MainScreen.tsx
import { useLocation } from "react-router-dom";
import handleClickAudio from "../../utils/textToSpeech";
import { useEffect, useRef, useState } from "react";
import {
  processImageForText,
  processLinkForText,
} from "../../utils/processing";

export default function MainScreen() {
  const location = useLocation();
  const selectedDisability = location.state?.selectedDisability || null;

  const [showLinkInput, setShowLinkInput] = useState(false);
  const [link, setLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedDisability === "analfabetismo") {
      //handleClickAudio("Bem-vindo à tela principal escolha se quer tirar uma foto ou selecionar um link.");
    }
  }, [selectedDisability]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleClickAudio(
        "Foto selecionada. Processando imagem com inteligência artificial."
      );
      const extractedText = await processImageForText(file);
      if (extractedText) {
        handleClickAudio(extractedText);
      } else {
        handleClickAudio(
          "Não consegui encontrar texto na foto ou ocorreu um erro."
        );
      }
      event.target.value = "";
    }
  };

  const processLink = async () => {
    if (link) {
      handleClickAudio(
        "Link inserido. Processando conteúdo da página com inteligência artificial."
      );
      const extractedText = await processLinkForText(link); // Chama a função
      if (extractedText) {
        handleClickAudio(extractedText);
      } else {
        handleClickAudio(
          "Não consegui ler o conteúdo do link ou ocorreu um erro."
        );
      }
    } else {
      // Se o link estiver vazio, dá um feedback
      handleClickAudio("Por favor, cole um link antes de processar.");
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleFunctionalityClick = (action: "tirarFoto" | "selecionarLink") => {
    if (action === "tirarFoto") {
      handleClickAudio("Tire ou coloque uma foto");
      fileInputRef.current?.click();
      setShowLinkInput(false);
      setLink("");
    } else {
      handleClickAudio("Coloque o link na caixa de texto");
      setShowLinkInput(true);
    }
  };

  return (
    <div>
      {selectedDisability === "analfabetismo" && (
        <div className="flex h-screen flex-col items-center justify-center bg-indigo-100">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              className="h-35"
              src="/img/logo.png"
              alt="Logo IAcessibilidade"
            />
          </div>

          {/* Input de foto */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {/* Input de link */}
          {showLinkInput && (
            <div className="flex items-center rounded-lg border-2 border-[#21409a] mt-20 px-2 py-1">
              <input
                type="text"
                placeholder="Cole o link aqui"
                value={link}
                onChange={handleLinkChange}
                className="text-2xl font-semibold text-center p-3 w-full focus:outline-none"
              />
              <button
                type="button"
                className="focus:outline-none"
                onClick={async () => {
                  await processLink();
                  setLink("");
                }}
              >
                <img
                  className="h-10 w-10 cursor-pointer"
                  src="/icons/play.svg"
                  alt="enviar e ouvir"
                />
              </button>
            </div>
          )}

          {/* Texto de seleção de funcionalidade */}
          <div className="pt-15 text-center flex gap-2">
            <h3 className="text-2xl font-semibold">O quê você quer fazer?</h3>
            <button
              type="button"
              onClick={() => handleClickAudio("O que você quer fazer")}
            >
              <img
                className="h-9 cursor-pointer"
                src="/icons/sound.svg"
                alt="Ouvir: O que você quer fazer?"
              />
            </button>
          </div>

          {/* Botões de Funcionalidade */}
          <div className="flex flex-col w-full gap-4 pt-14 px-10">
            {/* Tirar foto */}
            <button
              type="button"
              className="flex h-20 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer"
              onClick={() => handleFunctionalityClick("tirarFoto")}
            >
              <div className="flex items-center-safe gap-2">
                <img
                  className="h-10"
                  src="/icons/camera.svg"
                  alt="Tirar foto e ouvir"
                />
              </div>
            </button>
            {/* Ouvir Link */}
            <button
              type="button"
              className="flex h-20 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer "
              onClick={() => handleFunctionalityClick("selecionarLink")}
            >
              <div className="flex items-center-safe gap-2">
                <img
                  className="h-10"
                  src="/icons/link.svg"
                  alt="Selecionar Link e ouvir"
                />
              </div>
            </button>
          </div>

          {/* Rodapé */}
          <footer className="pt-10 gap-5 flex items-center">
            <img
              className="h-6"
              src="/img/imersaoIA.png"
              alt="Selo de Imersão IA by Alura + Google"
            />
            <a
              href="https://www.linkedin.com/in/stephanni/"
              target="_blank"
              className="font-semibold hover:text-indigo-600 hover:underline"
            >
              © Stephanni Cavalcante
            </a>
          </footer>
        </div>
      )}
    </div>
  );
}
