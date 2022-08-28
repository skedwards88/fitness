import React from "react";
import Timer from "./Timer";

export default function Workout({
  setShowSettings,
  dispatchWorkoutState,
  workoutState,
}) {
  return (
    <div>
      <div>{workoutState.currentExercise}</div>
      <Timer
        dispatchWorkoutState={dispatchWorkoutState}
        workoutState={workoutState}
      ></Timer>
      <div>
        {workoutState.isRunning ? (
          <button
            id="pauseButton"
            onClick={() => dispatchWorkoutState({ action: "pause" })}
          >
            Pause
          </button>
        ) : (
          <button
            id="playButton"
            onClick={() => dispatchWorkoutState({ action: "play" })}
          >
            Play
          </button>
        )}
        <button>Change</button>
        <button onClick={() => setShowSettings(true)}>New</button>
        <button>Cancel</button>
      </div>
    </div>
  );
}
