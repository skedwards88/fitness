import React from "react";

export default function Timer({ dispatchWorkoutState, workoutState }) {

  React.useEffect(() => {
    let timerID;
    if (workoutState.isRunning && workoutState.elapsedSec < workoutState.totalSec) {
      timerID = setInterval(
        () => dispatchWorkoutState({ action: "increment" }),
        1000
      );
    }
    return () => clearInterval(timerID);
  }, [workoutState.isRunning]);

  return (
    <div>
      <div>
        {workoutState.intervalSec -
          ((workoutState.elapsedSec) %
            workoutState.intervalSec)}
      </div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (((workoutState.elapsedSec) %
                workoutState.intervalSec) /
                workoutState.intervalSec) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div>{`${Math.floor(
        (workoutState.elapsedSec) /
          workoutState.intervalSec
      )} / ${workoutState.totalSec / workoutState.intervalSec}`}</div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (100 *
                Math.floor(
                  (workoutState.elapsedSec) /
                    workoutState.intervalSec
                )) /
              (workoutState.totalSec / workoutState.intervalSec)
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
}