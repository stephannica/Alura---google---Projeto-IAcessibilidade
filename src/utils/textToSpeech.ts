let lastSpokenText: string | null = null;

function speakText(text: string): void {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  let cleanedText = text;

  cleanedText = cleanedText.replace(/[*_#]/g, '')
  cleanedText = cleanedText.replace(/\s{2,}/g, ' ')
  cleanedText = cleanedText.replace(/\s*\*\*\s*/g, '');

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "pt-BR";
  utterance.rate = 1;

  lastSpokenText = cleanedText;

  window.speechSynthesis.speak(utterance);
}

export function restartLastSpokenText(): void {
    if (lastSpokenText !== null) {
        speakText(lastSpokenText);
    }
}

function handleClickAudio(text: string): void {
  speakText(text);
}

export default handleClickAudio;