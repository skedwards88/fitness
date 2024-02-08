import React from "react";
import { Statuses } from "./statuses";

function ProgressBar({ progressWidth, progressDirection }) {
  return (
    <div className="progressBar">
      <div
        className={`progress ${progressDirection}`}
        style={{
          width: `${progressWidth}%`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  let progressDirection;
  let progressSec;
  if (baseSec < workoutState.intermissionSec) {
    progressWidth = 100 - (baseSec / (workoutState.intermissionSec - 1)) * 100;
    progressDirection = "decrement";
    progressSec = workoutState.intermissionSec - baseSec - 1;
  } else {
    progressDirection = "increment";
    progressWidth =
      ((baseSec - workoutState.intermissionSec + 1) /
        workoutState.intervalSec) *
      100;
    progressSec = baseSec - workoutState.intermissionSec + 1;
  }

  function Warning({ exercisePool, secondaryExercisePool, totalIntervals }) {
    const numExercises =
      exercisePool.filter((i) => i).length +
      secondaryExercisePool.filter((i) => i).length;
    if (numExercises === 0) {
      return (
        <div className="warning">
          No exercises found! Try expanding your settings, or make up your own
          workout.
        </div>
      );
    } else if (numExercises < totalIntervals && numExercises < 25) {
      return (
        <div className="warning">{`Only ${numExercises} exercises found. Try expanding your settings, or expect repeats.`}</div>
      );
    } else {
      return <></>;
    }
  }
  let sideText = "";
  if (workoutState?.currentExercise?.bilateral) {
    sideText = workoutState.isFirstSide ? "first side" : "second side";
  }
  return (
    <div id="workout">
      <Warning
        exercisePool={workoutState.exercisePool}
        secondaryExercisePool={workoutState.secondaryExercisePool}
        totalIntervals={totalIntervals}
      ></Warning>

      <div id="exercise_info">
        <div>{baseSec < workoutState.intermissionSec ? `Up next:` : " "}</div>
        <div>{workoutState.currentExercise?.name}</div>
        <div>{sideText}</div>
      </div>

      <div className="progress-group">
        <div className="progress-label">{progressSec}</div>
        <ProgressBar
          progressDirection={progressDirection}
          progressWidth={progressWidth}
        ></ProgressBar>
      </div>

      <div className="progress-group">
        <div className="progress-label">{`${currentInterval} / ${totalIntervals}`}</div>
        <ProgressBar
          progressDirection="increment"
          progressWidth={100 * (currentInterval / totalIntervals)}
        ></ProgressBar>
      </div>

      <div id="workoutControls" className="button-group">
        {workoutState.status === Statuses.running ? (
          <button
            id="pauseButton"
            onClick={() => dispatchWorkoutState({ action: "pause" })}
          ></button>
        ) : (
          <button
            id="playButton"
            onClick={() => dispatchWorkoutState({ action: "play" })}
          ></button>
        )}
        {workoutState.muted ? (
          <button
            id="unmuteButton"
            onClick={() => dispatchWorkoutState({ action: "unmute" })}
          ></button>
        ) : (
          <button
            id="muteButton"
            onClick={() => dispatchWorkoutState({ action: "mute" })}
          ></button>
        )}
        <button
          id="swapButton"
          onClick={() => dispatchWorkoutState({ action: "swap" })}
        ></button>
        <button
          id="settingsButton"
          onClick={() => {
            dispatchWorkoutState({ action: "pause" });
            setShowSettings(true);
          }}
        ></button>
        <button
          id="cancelButton"
          onClick={() => dispatchWorkoutState({ action: "cancel" })}
        ></button>
      </div>
    </div>
  );
}
