import React from "react";
import "./App.css";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";
import getExercisesForCategory from "./exercises";
import { Area, Gear, Type } from "./categories";
import { Statuses } from "./statuses";

function shuffleArray(array) {
  let shuffledArray = array.slice();

  // Swap each value in an array, starting at the end of the array, with a position equal or earlier in the array.
  for (let index = shuffledArray.length - 1; index > 0; index--) {
    // Get a random index from 0 to the current index of the array
    // So for an array of length 3, the first round will be 0, 1, or 2, second round 0 or 1, and last round 0
    // The values at this index and the current index will be swapped
    let swapIndex = Math.floor(Math.random() * (index + 1));

    // If the current index and index to swap are the same, move on to the next loop iteration
    if (index === swapIndex) {
      continue;
    }

    // Get the original value at index,
    // set the value at the index to be the value at the swap index,
    // then set the value at the swap index to be the original value at the index
    let swapValue = shuffledArray[index];
    shuffledArray[index] = shuffledArray[swapIndex];
    shuffledArray[swapIndex] = swapValue;
  }

  return shuffledArray;
}

function getNewExercise({ exercisePool, secondaryExercisePool }) {
  if (!exercisePool.length) {
    exercisePool = secondaryExercisePool.reverse();
    secondaryExercisePool = [];
  }
  const newExercise = exercisePool.pop();

  return {
    currentExercise: newExercise,
    exercisePool: exercisePool,
    secondaryExercisePool: [...secondaryExercisePool, newExercise],
  };
}

function speak(text) {
  const allVoices = window.speechSynthesis.getVoices();
  const englishVoices = allVoices.filter((voice) =>
    voice.lang.startsWith("en")
  );
  const voice = englishVoices[Math.floor(Math.random() * englishVoices.length)];
  let speech = new SpeechSynthesisUtterance(text);
  speech.voice = voice;
  window.speechSynthesis.speak(speech);
}

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

    const amendedExercises =
      oldInterval === newInterval
        ? {}
        : getNewExercise({
            exercisePool: JSON.parse(JSON.stringify(currentState.exercisePool)),
            secondaryExercisePool: JSON.parse(
              JSON.stringify(currentState.secondaryExercisePool)
            ),
          });

    const totalIntervals = Math.floor(
      currentState.totalSec / currentState.intervalSec
    );
    const workoutIsOver = newInterval >= totalIntervals;

    if (!workoutIsOver && amendedExercises?.currentExercise) {
      speak(`Next up: ${amendedExercises.currentExercise}`);
    }

    if (workoutIsOver) {
      const endWorkoutPhrases = [
        "You rock!!!",
        "Good jorb!!!",
        "Yeah baby!!!",
        "Ohhhh yeah!!!",
        "Woohoo!!!",
        "Yippee!!!",
        "Nice!!!",
        "Who's awesome? You're awesome!!!",
      ];
      speak(
        endWorkoutPhrases[Math.floor(Math.random() * endWorkoutPhrases.length)]
      );
    }
    return {
      ...currentState,
      ...amendedExercises,
      elapsedSec: newElapsedSec,
      status: workoutIsOver ? Statuses.complete : currentState.status,
    };
  } else if (payload.action === "swap") {
    const amendedExercises = getNewExercise({
      exercisePool: JSON.parse(JSON.stringify(currentState.exercisePool)),
      secondaryExercisePool: JSON.parse(
        JSON.stringify(currentState.secondaryExercisePool)
      ),
    });

    return { ...currentState, ...amendedExercises };
  } else if (payload.action === "play") {
    return { ...currentState, status: Statuses.running };
  } else if (payload.action === "pause") {
    return { ...currentState, status: Statuses.paused };
  } else if (payload.action === "cancel") {
    return { ...currentState, status: Statuses.notStarted };
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
  useSaved = true,
}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("workoutState"))
    : undefined;

  totalSec = totalSec || savedState?.totalSec || 300;
  intervalSec = intervalSec || savedState?.intervalSec || 30;
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

  const exercisePool = shuffleArray(
    getExercisesForCategory({
      type: type,
      area: area,
      gear: gear,
    })
  );

  const firstExercise = exercisePool.pop();

  return {
    totalSec: totalSec,
    intervalSec: intervalSec,
    intermissionSec: 2,
    elapsedSec: 0,
    status: startWorkout ? Statuses.paused : Statuses.notStarted,
    area: area,
    type: type,
    gear: gear,
    exercisePool: exercisePool,
    secondaryExercisePool: [firstExercise],
    currentExercise: firstExercise,
  };
}

function App() {

  const [voices, setVoices] = React.useState([]);
  console.log(`1: voices ${voices}`)

  const populateVoiceList = React.useCallback(() => {
    console.log('in populateVoiceList')
    const newVoices = window.speechSynthesis.getVoices();
    console.log(`got ${newVoices}`)
    setVoices(newVoices);
  }, []);

  console.log(`2: voices ${voices}`)

  React.useEffect(() => {
    console.log(`in useEffect`)
    populateVoiceList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  const [showSettings, setShowSettings] = React.useState(false);

  const [workoutState, dispatchWorkoutState] = React.useReducer(
    workoutReducer,
    {},
    workoutInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("workoutState", JSON.stringify(workoutState));
  }, [workoutState]);

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
