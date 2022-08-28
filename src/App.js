import React from "react";
import "./App.css";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";
import getExercisesForCategory from "./exercises";

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
  } else if (payload.action === "increment") {
    const newElapsedSec = currentState.elapsedSec + 1;

    const oldInterval = Math.floor(
      currentState.elapsedSec /
        (currentState.intervalSec + currentState.intermissionSec)
    );

    const newInterval = Math.floor(
      newElapsedSec / (currentState.intervalSec + currentState.intermissionSec)
    );
    let currentExercise = currentState.currentExercise;
    if (oldInterval !== newInterval) {
      currentExercise = getExercise(currentState);
    }

    return {
      ...currentState,
      elapsedSec: newElapsedSec,
      isRunning:
        newElapsedSec < currentState.totalSec ? currentState.isRunning : false,
      currentExercise: currentExercise,
    };
  } else if (payload.action === "play") {
    return { ...currentState, isRunning: true };
  } else if (payload.action === "pause") {
    return { ...currentState, isRunning: false };
  } else {
    console.log(`unknown ${console.log(JSON.stringify(payload))}`);
    return { ...currentState };
  }
}

function workoutInit({ totalSec = 300, intervalSec = 45, gear, type, area }) {
  const matchingExercises = getExercisesForCategory({
    type: type,
    area: area,
    gear: gear,
  });
  //todo message/default? if no matching exericses
  //todo settings should default to settings not to false
  const firstExercise =
    matchingExercises[Math.floor(Math.random() * matchingExercises.length)];

  console.log(JSON.stringify(matchingExercises));
  console.log(firstExercise);
  return {
    totalSec: totalSec,
    intervalSec: intervalSec,
    intermissionSec: 5,
    elapsedSec: 0,
    isRunning: false,
    area: area,
    type: type,
    gear: gear,
    matchingExercises: matchingExercises,
    currentExercise: firstExercise,
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
  } else if (
    workoutState.elapsedSec &&
    workoutState.elapsedSec < workoutState.totalSec
  ) {
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
