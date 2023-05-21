import speak from "./speak";
import { Statuses } from "./statuses";
import workoutInit from "./workoutInit";
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
  } else if (payload.action === "unmute") {
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
        celebratoryPhrases[
          Math.floor(Math.random() * celebratoryPhrases.length)
        ]
      );
      return {
        ...currentState,
        elapsedSec: newElapsedSec,
        status: workoutIsOver ? Statuses.complete : currentState.status,
      };
    }

    // If we are in the same interval, keep the same exercise info
    const isLastInterval = newInterval + 1 === totalIntervals;
    if (oldInterval === newInterval) {
      // if this is the last interval and if we are on the first side of a bilateral, switch sides
      // (we do this instead of forcing the last exercise to be non-bilateral in case all of the exercises in the pool are bilateral)
      if (
        !currentState.muted &&
        isLastInterval &&
        currentState?.currentExercise?.bilateral &&
        currentState.isFirstSide &&
        currentState.totalSec +
          (newInterval + 1) * currentState.intermissionSec -
          newElapsedSec <=
          currentState.intervalSec / 2
      ) {
        speak(`Switch sides.`);
      }

      return {
        ...currentState,
        elapsedSec: newElapsedSec,
        status: workoutIsOver ? Statuses.complete : currentState.status,
      };
    }

    // Otherwise, change the interval:

    // If the user is making up their own workout, tell them to switch
    if (!currentState.currentExercise) {
      if (!currentState.muted) {
        speak(`Switch exercises.`);
      }

      return {
        ...currentState,
        elapsedSec: newElapsedSec,
        status: workoutIsOver ? Statuses.complete : currentState.status,
      };
    }

    // If bilateral, keep the same exercise but switch sides
    if (currentState?.currentExercise?.bilateral && currentState.isFirstSide) {
      if (!currentState.muted) {
        speak(`Switch sides.`);
      }

      return {
        ...currentState,
        isFirstSide: !currentState.isFirstSide,
        elapsedSec: newElapsedSec,
        status: workoutIsOver ? Statuses.complete : currentState.status,
      };
    }

    // Otherwise, change exercises
    const {
      currentExercise: newCurrentExercise,
      exercisePool: newExercisePool,
      secondaryExercisePool: newSecondaryExercisePool,
    } = getNewExercise({
      exercisePool: JSON.parse(JSON.stringify(currentState.exercisePool)),
      secondaryExercisePool: JSON.parse(
        JSON.stringify(currentState.secondaryExercisePool)
      ),
    });

    if (!currentState.muted) {
      newCurrentExercise.bilateral
        ? speak(`Next up: ${newCurrentExercise.name}, first side`)
        : speak(`Next up: ${newCurrentExercise.name}`);
    }

    return {
      ...currentState,
      currentExercise: newCurrentExercise,
      exercisePool: newExercisePool,
      isFirstSide: true,
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
    console.log(`unknown action: ${JSON.stringify(payload)}`);
    return { ...currentState };
  }
}
