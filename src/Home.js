import React from "react";

export default function Home({ setShowSettings }) {
  const homeScreenPhrases = [
    "Use it or lose it",
    "Healthy body, healthy life",
    "Just do it",
    "Life is more fun when you're living it",
    "Prioritize yourself",
    "Be proactive about staying active",
  ];

  return (
    <div id="home">
      <div>
        {
          homeScreenPhrases[
            Math.floor(Math.random() * homeScreenPhrases.length)
          ]
        }
      </div>
      <div id="mascot"></div>
      <div>1.6</div>
      <button
      onClick={() => {
        // ios won't speak unless the user clicks something first that directly causes speech
        // so do this hack of saying nothing
        let speech = new SpeechSynthesisUtterance("");
        window.speechSynthesis.speak(speech);

        setShowSettings(true)
      }}
      >Let's Go!</button>
    </div>
  );
}
