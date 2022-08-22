import React from "react";

export default function Timer({ dispatchWorkoutState, workoutState }) {
  console.log("workout state is:")
  console.log(JSON.stringify(workoutState))

  React.useEffect(() => {
    let timerID;
    if (workoutState.isRunning && workoutState.remainingSec > 0) {
      timerID = setInterval(
        () => dispatchWorkoutState({ action: "decrement" }),
        1000
      );
    }
    return () => clearInterval(timerID);
  }, [workoutState.isRunning]);

  return (
    <div>
      <div>
        {workoutState.intervalSec -
          ((workoutState.totalSec - workoutState.remainingSec) %
            workoutState.intervalSec)}
      </div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (((workoutState.totalSec - workoutState.remainingSec) %
                workoutState.intervalSec) /
                workoutState.intervalSec) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div>{`${Math.floor(
        (workoutState.totalSec - workoutState.remainingSec) /
          workoutState.intervalSec
      )} / ${workoutState.totalSec / workoutState.intervalSec}`}</div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (100 *
                Math.floor(
                  (workoutState.totalSec - workoutState.remainingSec) /
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