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

  if (payload.action === "reset") {
    return workoutInit(payload);
  }
  else if (payload.action === "decrement") {
    const newRemainingSec = currentState.remainingSec - 1;

    const oldInterval = Math.floor(
      (currentState.totalSec - currentState.remainingSec) /
      currentState.intervalSec
    )
    const newInterval = Math.floor(
      (currentState.totalSec - currentState.remainingSec - 1) /
      currentState.intervalSec
    )
    let currentExercise = currentState.currentExercise;
    if (currentState.totalSec - currentState.remainingSec > 0 && oldInterval !== newInterval){
      currentExercise = getExercise()
    }

    return {
      ...currentState,
      remainingSec: newRemainingSec,
      isRunning: newRemainingSec > 0 ? currentState.isRunning : false,
      currentExercise: currentExercise,
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
    totalSec: totalSec,
    intervalSec: intervalSec,
    intermissionSec: 5,
    remainingSec: totalSec,
    isRunning: false,
    areas: ["upper"],
    types: ["stretch", "strength"],
    gear: ["none"],
    currentExercise: {
      name: "jumping jacks",
      description: "",
      variations: [],
      type: "strength",
      primaryMuscle: "abs",
      equipment: "none",
    },
  };
}

function App() {
  const [showSettings, setShowSettings] = React.useState(false);

  const [workoutState, dispatchWorkoutState] = React.useReducer(
    workoutReducer,
    {totalSec: 300, intervalSec: 30}, // todo pull from old state in init and don't pass here?
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
  } else if (true || workoutState.remainingSec > 0) {
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
