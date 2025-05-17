// src/MainScreen.tsx
import { useLocation } from "react-router-dom";
import handleClickAudio from "../../utils/textToSpeech";
import { useEffect, useRef, useState } from "react";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      //Processamento IA
      event.target.value = "";
    }
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleFunctionalityClick = (action: "tirarFoto" | "selecionarLink") => {
    if (action === "tirarFoto") {
      handleClickAudio("Tire ou coloque uma foto")
      fileInputRef.current?.click();
      setShowLinkInput(false);
    } else {
      handleClickAudio("Coloque o link")
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

          {showLinkInput && (
            <div className="flex flex-col items-center pt-10">
              <input
                type="text"
                placeholder="Cole o link aqui"
                value={link}
                onChange={handleLinkChange}
                className="p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Texto de seleção de funcionalidade */}
          <div className="pt-30 text-center flex gap-2">
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
              onClick={() => handleFunctionalityClick('tirarFoto')}
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
              onClick={() => handleFunctionalityClick('selecionarLink')}
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
