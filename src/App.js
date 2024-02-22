import React from "react";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";
import {Statuses} from "./statuses";
import workoutReducer from "./workoutReducer";
import workoutInit from "./workoutInit";

function App() {
  const [showSettings, setShowSettings] = React.useState(false);

  const [workoutState, dispatchWorkoutState] = React.useReducer(
    workoutReducer,
    {},
    workoutInit,
  );

  React.useEffect(() => {
    window.localStorage.setItem("workoutState", JSON.stringify(workoutState));
  }, [workoutState]);

  const wakeLock = React.useRef(null);

  const getWakeLock = React.useCallback(async () => {
    console.log(`getting wakeLock`);
    if (!("wakeLock" in navigator)) {
      console.log("wakeLock not supported");
      return;
    }
    try {
      wakeLock.current = await navigator.wakeLock.request("screen");
      console.log(`2. wakeLock is ${wakeLock}`);

      wakeLock.current.addEventListener("release", () => {
        console.log("Screen Wake Lock released:");
      });
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  }, []);

  const releaseWakeLock = React.useCallback(async () => {
    console.log("releasing wakeLock");
    if (!("wakeLock" in navigator && wakeLock.current)) {
      console.log("no wakeLock to release");
      return;
    }
    await wakeLock.current.release();
  }, []);

  React.useEffect(() => {
    if (
      workoutState.status === Statuses.running &&
      workoutState.elapsedSec < workoutState.totalSec
    ) {
      getWakeLock();
    } else {
      releaseWakeLock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutState.status]);

  if (showSettings) {
    return (
      <Settings
        setShowSettings={setShowSettings}
        dispatchWorkoutState={dispatchWorkoutState}
        workoutState={workoutState}
      ></Settings>
    );
  } else if (
    workoutState.status === Statuses.running ||
    workoutState.status === Statuses.paused
  ) {
    return (
      <Workout
        setShowSettings={setShowSettings}
        dispatchWorkoutState={dispatchWorkoutState}
        workoutState={workoutState}
      ></Workout>
    );
  } else return <Home setShowSettings={setShowSettings}></Home>;
}

export default App;
