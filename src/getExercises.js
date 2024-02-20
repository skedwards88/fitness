import exercises from "./exercises.json";
import {Areas, Gears, Types} from "./categories";

export default function getExercises({type = [], area = [], gear = []}) {
  type = type || Types;
  area = area || Areas;
  gear = gear || Gears;

  const matchingExercises = exercises.filter(
    (exercise) =>
      type.includes(exercise.type) &&
      area.includes(exercise.area) &&
      gear.includes(exercise.gear),
  );

  return matchingExercises;
}
