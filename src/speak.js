export default function speak(text) {
  const allVoices = window.speechSynthesis.getVoices();
  const englishVoices = allVoices.filter((voice) =>
    voice.lang.startsWith("en")
  );
  const voice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
  let speech = new SpeechSynthesisUtterance(text);
  speech.voice = voice;
  window.speechSynthesis.speak(speech);
}
