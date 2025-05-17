function handleClickAudio(text: string) {
  const speech = new SpeechSynthesisUtterance();
  speech.lang = "pt-BR";
  speech.text = text;
  speech.rate = 0.8; 
  window.speechSynthesis.speak(speech);
};

export default handleClickAudio;