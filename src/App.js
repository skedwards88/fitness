import React from "react";
import "./App.css";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";

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

function workoutReducer(currentState, payload) {
  console.log("reducer:")
  console.log(JSON.stringify(payload));

  if (payload.action === "reset") {
    return workoutInit(payload);
  }
  else if (payload.action === "decrement") {
    const newRemainingSec = currentState.remainingSec - 1;
    return {
      ...currentState,
      remainingSec: newRemainingSec,
      isRunning: newRemainingSec > 0 ? currentState.isRunning : false,
    };
  }
  else if (payload.action === "increment") {
    const newRemainingSec =
      currentState.remainingSec + currentState.bonusTime;
    return {
      ...currentState,
      remainingSec: newRemainingSec,
      isRunning: newRemainingSec > 0 ? currentState.isRunning : false,
    };
  }
  else if (payload.action === "play") {
    return { ...currentState, isRunning: true };
  }
  else if (payload.action === "pause") {
    return { ...currentState, isRunning: false };
  }
  else {
    console.log(`unknown ${console.log(JSON.stringify(payload))}`);
    return { ...currentState };
  }
}

function workoutInit({ totalSec, intervalSec }) {
  return {
    remainingSec: totalSec,
    isRunning: false,
    totalSec: totalSec,
    intervalSec: intervalSec,
    areas: ["upper"],
    types: ["stretch", "strength"],
    gear: ["none"],
  };
}

function App() {
  const [showSettings, setShowSettings] = React.useState(false);

  const [workoutState, dispatchWorkoutState] = React.useReducer(
    workoutReducer,
    {},
    workoutInit
  );

  if (showSettings) {
    return (
      <Settings
        setShowSettings={setShowSettings}
        dispatchWorkoutState={dispatchWorkoutState}
        workoutState={workoutState}
      ></Settings>
    );
  } else if (workoutState.remainingSec > 0) {
    //todo if ex in progress
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
