// src/MainScreen.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { processImageForText, processLinkForText } from "../../utils/processing";


import handleClickAudio, { restartLastSpokenText } from "../../utils/textToSpeech";
import VisualImpairments from "../VisualImpairmentsUI";
import Illiteracy from "../IlliteracyUI";

export default function MainScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDisability = location.state?.selectedDisability || null;

  const [link, setLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

    const handleGoBack = () => {
    navigate('/');
    setLink('');
    setExtractedText(null);
    setPhotoPreviewUrl(null);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleClickAudio(
        "Foto selecionada. Processando imagem com inteligência artificial."
      );
      setExtractedText(null);
      setLink("");
      setPhotoPreviewUrl(null);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreviewUrl(reader.result as string); 
      };
      reader.readAsDataURL(file);

      const text = await processImageForText(file);
      if (text) {
        setExtractedText(text)
        handleClickAudio(text);
      } else {
        setExtractedText(null);
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
      setExtractedText(null)
      setPhotoPreviewUrl(null)

      const text = await processLinkForText(link); // Chama a função
      if (text) {
        setExtractedText(text);
        handleClickAudio(text);
      } else {
        setExtractedText(null);
        handleClickAudio(
          "Não consegui ler o conteúdo do link ou ocorreu um erro."
        );
      }
    } else {
      handleClickAudio("Por favor, cole um link antes de processar.");
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
    setExtractedText(null);
    setPhotoPreviewUrl(null)
  };

  const triggerPhotoInput = () => {
    handleClickAudio("Tire ou coloque uma foto");
    fileInputRef.current?.click();
    setExtractedText(null);
    setLink('');
    setPhotoPreviewUrl(null)
  };

  const triggerLinkInput = () => {
    handleClickAudio("Coloque o link na caixa de texto");
    setExtractedText(null);
    setPhotoPreviewUrl(null)
  };

  return (
    <div>
      {/* Input de foto */}
      <input
        type="file"
        aria-label="Escolher foto"
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
          onRestartSpeaking={restartLastSpokenText}
          isAudioAvailable={!!extractedText}
          photoPreviewUrl={photoPreviewUrl}
          onGoBack={handleGoBack}
        />
      )}

      {selectedDisability === "deficienciaVisual" && (
        <VisualImpairments
          linkValue={link}
          onLinkChange={handleLinkChange}
          onProcessLink={processLink}
          onTriggerPhoto={triggerPhotoInput}
          onTriggerLink={triggerLinkInput}
          onRestartSpeaking={restartLastSpokenText}
          isAudioAvailable={!!extractedText}
          photoPreviewUrl={photoPreviewUrl}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
}