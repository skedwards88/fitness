import React from "react";

export default function Home({ setShowSettings }) {
  // todo repeat button disabled unless prev workout available
  return (
    <div>
      <div>icon or quote? and/or prev workout info complete</div>
      <div>prev workout info</div>
      <button>Repeat</button>
      <button onClick={() => setShowSettings(true)}>New</button>
    </div>
  );
}
