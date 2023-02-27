import React from "react";
import { motivationalPhrases } from "./motivationalPhrases";

export default function Home({ setShowSettings }) {

  return (
    <div id="home">
      <div>
        {
          motivationalPhrases[
            Math.floor(Math.random() * motivationalPhrases.length)
          ]
        }
      </div>
      <div id="mascot"></div>
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
