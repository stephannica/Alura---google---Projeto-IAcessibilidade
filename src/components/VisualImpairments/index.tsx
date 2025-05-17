import { useState } from "react";
import handleClickAudio from "../../utils/textToSpeech";

interface VisualImpairmentsProps {
  linkValue: string;
  onLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessLink: () => Promise<void>;
  onTriggerPhoto: () => void;
  onTriggerLink: () => void;
}

export default function VisualImpairments({
  linkValue, onLinkChange, onProcessLink, onTriggerPhoto, onTriggerLink,}: VisualImpairmentsProps) {
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
    <div className="flex h-screen flex-col items-center justify-center bg-white text-gray-900 high-contrast-theme">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img className="h-35" src="/img/logo.png" alt="Logo IAcessibilidade" />
      </div>

      {/* Input de link */}
      {showLinkInput && (
        <div className="flex items-center rounded-lg border-2 border-[#21409a] mt-20 px-2 py-1">
          <input
            type="text"
            placeholder="Cole o link aqui"
            value={linkValue}
            onChange={onLinkChange}
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
          className="flex h-20 items-center justify-center rounded-lg bg-[#21409a] text-white hover:bg-indigo-900 transition duration-300 cursor-pointer "
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