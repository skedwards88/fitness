import getExercises from "./getExercises";
import shuffleArray from "./shuffleArray";
import {Areas, Gears, Types} from "./categories";
import {Statuses} from "./statuses";

export default function workoutInit({
  totalSec,
  intervalSec,
  gear,
  type,
  area,
  startWorkout,
  muted,
  useSaved = true,
}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("workoutState"))
    : undefined;
  totalSec = totalSec || savedState?.totalSec || 300;
  intervalSec = intervalSec || savedState?.intervalSec || 30;
  gear = gear || savedState?.gear || Gears;
  type = type || savedState?.type || Types;
  area = area || savedState?.area || Areas;
  muted = muted ?? savedState?.muted ?? false;

  const exercisePool = shuffleArray(
    getExercises({
      type: type,
      area: area,
      gear: gear,
    }),
  );
  const firstExercise = exercisePool.pop();

  return {
    totalSec: totalSec,
    intervalSec: intervalSec,
    intermissionSec: 5,
    elapsedSec: 0,
    status: startWorkout ? Statuses.paused : Statuses.notStarted,
    area: area,
    type: type,
    gear: gear,
    exercisePool: exercisePool,
    secondaryExercisePool: [firstExercise],
    currentExercise: firstExercise,
    isFirstSide: true,
    muted: muted,
  };
}
