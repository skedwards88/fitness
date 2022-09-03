import React from "react";

export default function Home({ setShowSettings }) {
  const homeScreenPhrases = [
    "Use it or lose it",
    "Healthy body, healthy life",
    "Just do it",
    "Life is more fun when you're living it",
    "Prioritize your self",
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
      <button onClick={() => setShowSettings(true)}>Let's Go!</button>
    </div>
  );
}
