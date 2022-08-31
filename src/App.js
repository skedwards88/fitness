import React from "react";
import "./App.css";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";
import getExercisesForCategory from "./exercises";
import { Area, Gear, Type } from "./categories";
import { Statuses } from "./statuses";

function workoutReducer(currentState, payload) {
  if (payload.action === "newWorkout") {
    return workoutInit({ ...payload, startWorkout: true });
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
      currentExercise =
        currentState.matchingExercises[
          Math.floor(Math.random() * currentState.matchingExercises.length)
        ];
    }

    return {
      ...currentState,
      elapsedSec: newElapsedSec,
      status:
        newElapsedSec < currentState.totalSec
          ? currentState.status
          : Statuses.complete,
      currentExercise: currentExercise,
    };
  } else if (payload.action === "play") {
    return { ...currentState, status: Statuses.running };
  } else if (payload.action === "pause") {
    return { ...currentState, status: Statuses.paused };
  } else {
    console.log(`unknown ${console.log(JSON.stringify(payload))}`);
    return { ...currentState };
  }
}

function workoutInit({
  totalSec,
  intervalSec,
  gear,
  type,
  area,
  startWorkout,
}) {
  const savedState = undefined; //todo

  totalSec = totalSec || savedState?.totalSec || 300;
  intervalSec = intervalSec || savedState?.intervalSec || 45;
  gear = gear ||
    savedState?.gear || [
      Gear.bodyWeight,
      Gear.massageBall,
      Gear.resistanceBands,
    ];
  type = type ||
    savedState?.type || [
      Type.cardio,
      Type.massage,
      Type.stretch,
      Type.strength,
    ];
  area = area || savedState?.area || [Area.core, Area.lower, Area.upper];

  const matchingExercises = getExercisesForCategory({
    type: type,
    area: area,
    gear: gear,
  });
  //todo message/default? if no matching exericses
  const firstExercise =
    matchingExercises[Math.floor(Math.random() * matchingExercises.length)];

  console.log(JSON.stringify(matchingExercises));
  return {
    totalSec: totalSec,
    intervalSec: intervalSec,
    intermissionSec: 5,
    elapsedSec: 0,
    status: startWorkout ? Statuses.paused : Statuses.notStarted,
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
    (workoutState.status === Statuses.running ||
      workoutState.status === Statuses.paused) &&
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
