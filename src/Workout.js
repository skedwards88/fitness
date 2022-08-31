import React from "react";
import { Statuses } from "./statuses";

function ProgressBar({ progressWidth, progressColor }) {
  return (
    <div className="progressBar">
      <div
        className="progress"
        style={{
          width: `${progressWidth}%`,
          backgroundColor: progressColor,
        }}
      ></div>
    </div>
  );
}

export default function Workout({
  setShowSettings,
  dispatchWorkoutState,
  workoutState,
}) {
  React.useEffect(() => {
    let timerID;
    if (
      workoutState.status === Statuses.running &&
      workoutState.elapsedSec < workoutState.totalSec
    ) {
      timerID = setInterval(
        () => dispatchWorkoutState({ action: "increment" }),
        1000
      );
    }
    return () => clearInterval(timerID);
  }, [workoutState.status]);

  // time elapsed within the current intermission+interval
  const baseSec =
    workoutState.elapsedSec %
    (workoutState.intervalSec + workoutState.intermissionSec);

  const currentInterval = Math.floor(
    workoutState.elapsedSec /
      (workoutState.intervalSec + workoutState.intermissionSec)
  );
  const totalIntervals = Math.floor(
    workoutState.totalSec / workoutState.intervalSec
  );

  // if in intermission, count down
  // otherwise, count up
  let progressWidth;
  let progressColor;
  let progressSec;
  if (baseSec < workoutState.intermissionSec) {
    progressWidth = 100 - (baseSec / (workoutState.intermissionSec - 1)) * 100;
    progressColor = "red";
    progressSec = workoutState.intermissionSec - baseSec - 1;
  } else {
    progressColor = "green";
    progressWidth =
      ((baseSec - workoutState.intermissionSec + 1) /
        workoutState.intervalSec) *
      100;
    progressSec = baseSec - workoutState.intermissionSec + 1;
  }

  return (
    <div>
      <div>
        {baseSec < workoutState.intermissionSec
          ? `Up next: ${workoutState.currentExercise}`
          : workoutState.currentExercise}
      </div>
      <div>{progressSec}</div>
      <ProgressBar
        progressColor={progressColor}
        progressWidth={progressWidth}
      ></ProgressBar>

      <div>{`${currentInterval} / ${totalIntervals}`}</div>
      <ProgressBar
        progressColor="green"
        progressWidth={100 * (currentInterval / totalIntervals)}
      ></ProgressBar>
      <div>
        {workoutState.status === Statuses.running ? (
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
