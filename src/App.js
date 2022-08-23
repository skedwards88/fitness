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
  else if (payload.action === "increment") {
    const newElapsedSec = currentState.elapsedSec + 1;

    const oldInterval = Math.floor(
      (currentState.elapsedSec) /
      currentState.intervalSec
    )
    const newInterval = Math.floor(
      (newElapsedSec) /
      currentState.intervalSec
    )
    console.log(`old int ${oldInterval}, newInt ${newInterval}`);
    let currentExercise = currentState.currentExercise;
    if (oldInterval !== newInterval){
      currentExercise = getExercise()
    }
    console.log(`is running: ${newElapsedSec < currentState.totalSec}`)

    return {
      ...currentState,
      elapsedSec: newElapsedSec,
      isRunning: newElapsedSec < currentState.totalSec ? currentState.isRunning : false,
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
    elapsedSec: 0,
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
  } else if (true || newElapsedSec < currentState.totalSec) {
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
