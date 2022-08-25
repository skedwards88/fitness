import React from "react";

export default function Timer({ dispatchWorkoutState, workoutState }) {
  React.useEffect(() => {
    let timerID;
    if (
      workoutState.isRunning &&
      workoutState.elapsedSec < workoutState.totalSec
    ) {
      timerID = setInterval(
        () => dispatchWorkoutState({ action: "increment" }),
        1000
      );
    }
    return () => clearInterval(timerID);
  }, [workoutState.isRunning]);

  // time elapsed within the current intermission+interval
  const baseSec =
    workoutState.elapsedSec %
    (workoutState.intervalSec + workoutState.intermissionSec);

  const currentInterval = Math.floor(
    workoutState.elapsedSec /
      (workoutState.intervalSec + workoutState.intermissionSec)
  );
  const totalIntervals = workoutState.totalSec / workoutState.intervalSec;

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
      <div>{progressSec}</div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${progressWidth}%`,
            backgroundColor: progressColor,
          }}
        ></div>
      </div>
      <div>{`${currentInterval} / ${totalIntervals}`}</div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${100 * (currentInterval / totalIntervals)}%`,
            backgroundColor: "green",
          }}
        ></div>
      </div>
    </div>
  );
}
