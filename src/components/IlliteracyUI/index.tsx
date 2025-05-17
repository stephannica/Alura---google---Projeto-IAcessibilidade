import { useState } from "react";
import handleClickAudio from "../../utils/textToSpeech";

interface IlliteracyProps {
  linkValue: string;
  onLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessLink: () => Promise<void>;
  onTriggerPhoto: () => void;
  onTriggerLink: () => void;
  onRestartSpeaking: () => void;
  isAudioAvailable: boolean;
  photoPreviewUrl?: string | null;
  onGoBack: () => void;
}

export default function Illiteracy({
  linkValue,
  onGoBack,
  isAudioAvailable,
  photoPreviewUrl,
  onLinkChange,
  onProcessLink,
  onTriggerPhoto,
  onTriggerLink,
  onRestartSpeaking,
}: IlliteracyProps) {
  const [showLinkInput, setShowLinkInput] = useState(false);

  const handleLocalFunctionalityClick = (
    action: "tirarFoto" | "selecionarLink"
  ) => {
    if (action === "tirarFoto") {
      onTriggerPhoto();
      setShowLinkInput(false);
    } else {
      onTriggerLink();
      setShowLinkInput(true);
    }
  };

  const handleLocalProcessLink = async () => {
    if (linkValue) {
      await onProcessLink();
    } else {
      handleClickAudio("Por favor, cole um link antes de processar.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-indigo-100">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img className="h-35" src="/img/logo.png" alt="Logo IAcessibilidade" />
      </div>

      {/* Preview da foto */}
      {photoPreviewUrl && (
        <div className="mt-4 max-w-full h-auto ">
          <img
            src={photoPreviewUrl}
            alt="Prévia da foto selecionada"
            className="max-w-full h-auto rounded-lg shadow-md"
            style={{ maxHeight: "300px" }}
          />
        </div>
      )}

      {/* Input de link */}
      {showLinkInput && (
        <div className="flex items-center rounded-lg border-2 border-[#21409a] mt-20 px-2 py-1">
          <input
            type="text"
            placeholder="Cole o link aqui"
            value={linkValue}
            onChange={onLinkChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLocalProcessLink();
              }
            }}
            className="text-2xl font-semibold text-center p-3 w-full focus:outline-none"
          />
          <button
            type="button"
            className="focus:outline-none"
            onClick={handleLocalProcessLink}
          >
            <img
              className="h-10 w-10 cursor-pointer"
              src="/icons/play.svg"
              alt="enviar e ouvir"
            />
          </button>
        </div>
      )}

      {/* Botões de reprodução */}
      {isAudioAvailable && (
        <div className="mt-8 flex gap-4">
          {/* Botão Reiniciar */}
          <button
            type="button"
            onClick={onRestartSpeaking}
            className="text-3xl font-semibold p-3 rounded-lg bg-[#21409a] text-white hover:bg-indigo-900"
          >
            <div className="flex items-center-safe gap-2">
              <img
                src="/icons/reset.svg"
                className="h-10"
                alt="Repetir Áudio"
              ></img>
            </div>
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
      <div className="flex flex-col gap-4 pt-14 px-10">
        {/* Tirar foto */}
        <button
          type="button"
          className="flex h-20 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer"
          onClick={() => handleLocalFunctionalityClick("tirarFoto")}
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
          className="flex h-20 p-10 px-30 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer "
          onClick={() => handleLocalFunctionalityClick("selecionarLink")}
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

      <div className="flex flex-col gap-4 pt-14 px-10">
        <button
          type="button"
          onClick={onGoBack}
          className="flex h-20 px-30 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer"
        >
          <div className="flex items-center-safe gap-5">
            <img
              className="h-10"
              src="/icons/arrow-left.svg"
              alt="Voltar"
              onClick={() => handleClickAudio("Voltar")}
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
  );
}
