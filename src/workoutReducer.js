import speak from "./speak";
import { Statuses } from "./statuses";
import workoutInit from "./workoutInit"
import { celebratoryPhrases } from "./celebratoryPhrases.js";

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

export default function workoutReducer(currentState, payload) {
  if (payload.action === "newWorkout") {
    return workoutInit({ ...payload, startWorkout: true });
  } else if (payload.action === "mute") {
    return { ...currentState, muted: true };
  }  else if (payload.action === "unmute") {
    return { ...currentState, muted: false };
  } else if (payload.action === "increment") {
    const newElapsedSec = currentState.elapsedSec + 1;
    const oldInterval = Math.floor(
      currentState.elapsedSec /
        (currentState.intervalSec + currentState.intermissionSec)
    );

    const newInterval = Math.floor(
      newElapsedSec / (currentState.intervalSec + currentState.intermissionSec)
    );

    const totalIntervals = Math.floor(
      currentState.totalSec / currentState.intervalSec
    );
    const workoutIsOver = newInterval >= totalIntervals;

    // Return early if workout is over
    if (workoutIsOver && !currentState.muted) {
      speak(
        celebratoryPhrases[Math.floor(Math.random() * celebratoryPhrases.length)]
      );
      return {
        ...currentState,
        elapsedSec: newElapsedSec,
        status: workoutIsOver ? Statuses.complete : currentState.status,
      };
    }

    let newCurrentExercise
    let newExercisePool
    let newSecondaryExercisePool
    let newIsFirstSide
    if (oldInterval === newInterval) {
      // keep the same info
      newCurrentExercise = currentState.currentExercise
      newExercisePool = currentState.exercisePool
      newSecondaryExercisePool = currentState.secondaryExercisePool
      newIsFirstSide = currentState.isFirstSide
    } else if (currentState.currentExercise.bilateral && currentState.isFirstSide) {
      // keep the same exercise but switch sides
      newCurrentExercise = currentState.currentExercise
      newExercisePool = currentState.exercisePool
      newSecondaryExercisePool = currentState.secondaryExercisePool
      newIsFirstSide = !currentState.isFirstSide
      
      console.log(`changing sides from ${currentState.isFirstSide} to ${newIsFirstSide}`)
      if (!currentState.muted) {
        speak(`Switch sides.`);
      }
    } else {
      // get new exercise //todo make this not return bilat if last interval?
      ({currentExercise: newCurrentExercise ,
        exercisePool:newExercisePool,
        secondaryExercisePool: newSecondaryExercisePool} = getNewExercise({
        exercisePool: JSON.parse(JSON.stringify(currentState.exercisePool)),
        secondaryExercisePool: JSON.parse(
          JSON.stringify(currentState.secondaryExercisePool)
        ),
      }));
      newIsFirstSide = true;

      if (!currentState.muted) {
        newCurrentExercise.bilateral ? speak(`Next up: ${newCurrentExercise.name}, first side`) : speak(`Next up: ${newCurrentExercise.name}`);
      }
    }

    return {
      ...currentState,
      currentExercise: newCurrentExercise,
      exercisePool: newExercisePool,
      isFirstSide: newIsFirstSide,
      secondaryExercisePool: newSecondaryExercisePool,
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