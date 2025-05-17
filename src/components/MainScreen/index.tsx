// src/MainScreen.tsx
import { useLocation } from "react-router-dom";
import handleClickAudio from "../../utils/textToSpeech";
import { useEffect, useRef, useState } from "react";
import {
  processImageForText,
  processLinkForText,
} from "../../utils/processing";
import VisualImpairments from "../VisualImpairmentsUI";
import Illiteracy from "../IlliteracyUI";

export default function MainScreen() {
  const location = useLocation();
  const selectedDisability = location.state?.selectedDisability || null;

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

  const triggerPhotoInput = () => {
    handleClickAudio("Tire ou coloque uma foto");
    fileInputRef.current?.click();
  };

  const triggerLinkInput = () => {
    handleClickAudio("Coloque o link na caixa de texto");
  };

  return (
    <div>
      {/* Input de foto */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {selectedDisability === "analfabetismo" && (
        <Illiteracy
          linkValue={link}
          onLinkChange={handleLinkChange}
          onProcessLink={processLink}
          onTriggerPhoto={triggerPhotoInput}
          onTriggerLink={triggerLinkInput}
        />
      )}
      {selectedDisability === "deficienciaVisual" && (
        <VisualImpairments
          linkValue={link}
          onLinkChange={handleLinkChange}
          onProcessLink={processLink}
          onTriggerPhoto={triggerPhotoInput}
          onTriggerLink={triggerLinkInput}
        />
      )}
    </div>
  );
}
