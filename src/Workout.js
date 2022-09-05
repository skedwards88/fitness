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
  console.log('rerender')
  return (
    
    <div id="workout">
      <Warning
        exercisePool={workoutState.exercisePool}
        secondaryExercisePool={workoutState.secondaryExercisePool}
        totalIntervals={totalIntervals}
      ></Warning>

      <div id="exercise_info">
        <div>{baseSec < workoutState.intermissionSec ? `Up next:` : " "}</div>
        <div>{workoutState.currentExercise}</div>
      </div>

      <div className="progress-group">
        <div className="progress-label">{progressSec}</div>
        <ProgressBar
          progressColor={progressColor}
          progressWidth={progressWidth}
        ></ProgressBar>
      </div>

      <div className="progress-group">
        <div className="progress-label">{`${currentInterval} / ${totalIntervals}`}</div>
        <ProgressBar
          progressColor="green"
          progressWidth={100 * (currentInterval / totalIntervals)}
        ></ProgressBar>
      </div>

      <div className="button-group">
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
        <button
          id="swapButton"
          onClick={() => dispatchWorkoutState({ action: "swap" })}
        >
          Swap
        </button>
        <button onClick={() => setShowSettings(true)}>New</button>
        <button
          id="cancelButton"
          onClick={() => dispatchWorkoutState({ action: "cancel" })}
        >
          Cancel
        </button>
        <button
          id="talkButton"
          onClick={() => {
            let speech = new SpeechSynthesisUtterance("hello there");
            window.speechSynthesis.speak(speech);

            let allVoices = window.speechSynthesis.getVoices();
            console.log(allVoices)
            console.log(Array.from(allVoices).length)
            let speech2 = new SpeechSynthesisUtterance(`I have ${Array.from(allVoices).length} voices`);
            window.speechSynthesis.speak(speech2);

            const englishVoices = allVoices.filter((voice) =>voice.lang.startsWith("en"));
            let speech3 = new SpeechSynthesisUtterance(`I have ${Array.from(englishVoices).length} english voices`);
            window.speechSynthesis.speak(speech3);
            for (let index = 0; index < englishVoices.length; index++) {
              let speech4 = new SpeechSynthesisUtterance(`This is voice number ${index}`);
              speech4.voice = englishVoices[index];
              window.speechSynthesis.speak(speech4);
            }
          }}
        >
          Talk
        </button>
      </div>
    </div>
  );
}
