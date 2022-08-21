import React from "react";
import "./App.css";

function getExercise() {
  return {
    name: "reverse crunches",
    description: "",
    variations: [],
    type: "strength",
    primaryMuscle: "abs",
    equipment: "none",
  };
}
function reducer(currentState, payload) {
  return { ...currentState };
}

function timerReducer(currentTimerState, payload) {
  if (payload.action === "reset") {
    return timerInit({ totalSec: payload.totalSec });
  } else if (payload.action === "decrement") {
    const newRemainingSec = currentTimerState.remainingSec - 1;
    return {
      ...currentTimerState,
      remainingSec: newRemainingSec,
      isRunning: newRemainingSec > 0 ? currentTimerState.isRunning : false,
    };
  } else if (payload.action === "increment") {
    const newRemainingSec =
      currentTimerState.remainingSec + currentTimerState.bonusTime;
    return {
      ...currentTimerState,
      remainingSec: newRemainingSec,
      isRunning: newRemainingSec > 0 ? currentTimerState.isRunning : false,
    };
  } else if (payload.action === "play") {
    return { ...currentTimerState, isRunning: true };
  } else if (payload.action === "pause") {
    return { ...currentTimerState, isRunning: false };
  } else {
    console.log(`unknown ${console.log(JSON.stringify(payload))}`);
    return { ...currentTimerState };
  }
}

function init() {
  return {
    totalSec: 5 * 60,
    intervalSec: 5,
    areas: ["upper"],
    types: ["stretch", "strength"],
    gear: ["none"],
  };
}

function timerInit({ totalSec }) {
  console.log(`timer init ${totalSec}`);
  return {
    remainingSec: totalSec,
    isRunning: false,
  };
}

function Timer({ timerState, dispatchTimerState, workoutState }) {
  React.useEffect(() => {
    let timerID;
    if (timerState.isRunning && timerState.remainingSec > 0) {
      timerID = setInterval(
        () => dispatchTimerState({ action: "decrement" }),
        1000
      );
    }
    return () => clearInterval(timerID);
  }, [timerState.isRunning]);

  return (
    <div>
      <div>
        {workoutState.intervalSec -
          ((workoutState.totalSec - timerState.remainingSec) %
            workoutState.intervalSec)}
      </div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (((workoutState.totalSec - timerState.remainingSec) %
                workoutState.intervalSec) /
                workoutState.intervalSec) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div>{`${Math.floor(
        (workoutState.totalSec - timerState.remainingSec) /
          workoutState.intervalSec
      )} / ${workoutState.totalSec / workoutState.intervalSec}`}</div>
      <div className="progressBar">
        <div
          className="progress"
          style={{
            width: `${
              (100 *
                Math.floor(
                  (workoutState.totalSec - timerState.remainingSec) /
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

function Home({ setShowSettings }) {
  return (
    <div>
      <div>text</div>
      <button>Repeat</button>
      <button onClick={() => setShowSettings(true)}>New</button>
    </div>
  );
}

function Workout({
  setShowSettings,
  timerState,
  dispatchTimerState,
  workoutState,
}) {
  return (
    <div>
      <div>exercise info</div>
      <div>up next</div>
      <div>timer</div>
      <div>total</div>
      <Timer
        dispatchTimerState={dispatchTimerState}
        timerState={timerState}
        workoutState={workoutState}
      ></Timer>
      <div>
        {timerState.isRunning ? (
          <button
            id="pauseButton"
            onClick={() => dispatchTimerState({ action: "pause" })}
          >
            Pause
          </button>
        ) : (
          <button
            id="playButton"
            onClick={() => dispatchTimerState({ action: "play" })}
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

function Settings({
  setShowSettings,
  dispatchTimerState,
  workoutState,
  setWorkoutState,
}) {
  function handleNewWorkout(event) {
    event.preventDefault();

    const newTotalSec = parseInt(event.target.elements.totalSec.value);
    const newIntervalSec = parseInt(event.target.elements.intervalSec.value);

    setWorkoutState({
      ...workoutState,
      totalSec: newTotalSec,
      intervalSec: newIntervalSec,
    });

    dispatchTimerState({
      action: "reset",
      totalSec: newTotalSec,
    });

    setShowSettings(false);
  }

  return (
    <div>
      Settings
      <form onSubmit={(event) => handleNewWorkout(event)}>
        <div>
          <label htmlFor="totalSec">Total</label>
          <select id="totalSec" defaultValue={workoutState.totalSec || 5 * 60}>
            <option value={3 * 60}>3</option>
            <option value={5 * 60}>5</option>
            <option value={10 * 60}>10</option>
          </select>

          <label htmlFor="intervalSec">Total</label>
          <select
            id="intervalSec"
            defaultValue={workoutState.intervalSec || 15}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
          </select>
        </div>
        <button type="submit">Start</button>
        <button type="button" onClick={() => setShowSettings(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

function App() {
  const [showSettings, setShowSettings] = React.useState(false);

  const [workoutState, setWorkoutState] = React.useState({
    totalSec: 5 * 60,
    intervalSec: 5,
    areas: ["upper"],
    types: ["stretch", "strength"],
    gear: ["none"],
  });

  const [timerState, dispatchTimerState] = React.useReducer(
    timerReducer,
    {},
    timerInit
  );

  console.log(
    `timerState.remainingSec ${timerState.remainingSec}, workoutState.totalSec ${workoutState.totalSec}`
  );
  if (showSettings) {
    return (
      <Settings
        setShowSettings={setShowSettings}
        dispatchTimerState={dispatchTimerState}
        workoutState={workoutState}
        setWorkoutState={setWorkoutState}
      ></Settings>
    );
  } else if (timerState.remainingSec > 0) {
    //todo if ex in progress
    return (
      <Workout
        setShowSettings={setShowSettings}
        dispatchTimerState={dispatchTimerState}
        timerState={timerState}
        workoutState={workoutState}
      ></Workout>
    );
  } else return <Home setShowSettings={setShowSettings}></Home>;
}

export default App;
