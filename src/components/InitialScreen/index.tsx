import { useNavigate } from "react-router-dom";
import handleClickAudio from "../../utils/textToSpeech";

function InitialScreen() {
  const navigate = useNavigate();

  const handleDisabilityClick = (
    disability: "analfabetismo" | "deficienciaVisual"
  ) => {
    navigate("/main", { state: { selectedDisability: disability } });
  };

  const handleAnalfabetismoClick = () => {
    handleClickAudio("Selecionado dificuldade em ler");
    handleDisabilityClick("analfabetismo");
  };
  const handleDeficienciaVisualClick = () => {
    handleClickAudio("Selecionado problemas de visão");
    handleDisabilityClick("deficienciaVisual");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-indigo-100">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <img className="h-35" src="/img/logo.png" alt="Logo IAcessibilidade" />
      </div>

      {/* Texto de seleção de dificuldade*/}
      <div className="pt-20 pb-15 text-center flex gap-2">
        <h3 className="text-2xl font-semibold">Escolha sua dificuldade:</h3>
        <button
          type="button"
          onClick={() => handleClickAudio("Escolha sua dificuldade")}
        >
          <img
            className="h-9 cursor-pointer"
            src="/icons/sound.svg"
            alt="Ouvir: Escolha sua dificuldade"
          />
        </button>
      </div>

      {/* Botões de dificuldade */}
      <div className="grid grid-cols-2 gap-4 pt-20">
        {/* Analfabetismo */}
        <button
          type="button"
          onClick={() => {
            handleAnalfabetismoClick();
          }}
        >
          <div className="flex flex-col h-20 w-40 items-center justify-center rounded-lg cursor-pointer">
            <img
              className="rounded-3xl hover:scale-105 hover:brightness-75 transition duration-300"
              src="/img/analfabetismo.png"
              alt="Analfabetismo"
            />
            <p className="font-semibold text-2xl">Dificuldade em ler</p>
          </div>
        </button>
        {/* Deficiência Visual */}
        <button
          type="button"
          onClick={() => {
            handleDeficienciaVisualClick();
          }}
        >
          <div className="flex flex-col h-20 w-40 items-center justify-center rounded-lg cursor-pointer">
            <img
              className="rounded-3xl hover:scale-105 hover:brightness-75 transition duration-300"
              src="/img/deficienciaVisual.png"
              alt="Deficiência Visual"
            />
            <p className="font-semibold text-2xl">Problemas de visão</p>
          </div>
        </button>
      </div>

      {/* Rodapé */}
      <footer className="pt-40 gap-5 flex items-center">
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

export default InitialScreen;