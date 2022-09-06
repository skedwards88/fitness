import exercises from "./exercises.json";
import { Area, Gear, Type } from "./categories";

export default function getExercises({
  type = [],
  area = [],
  gear = [],
}) {
  type = type || [Type.cardio, Type.massage, Type.stretch, Type.strength];
  area = area || [Area.core, Area.lower, Area.upper];
  gear = gear || [Gear.bodyWeight, Gear.massageBall, Gear.resistanceBands];

  const matchingExercises = exercises.filter(exercise=>(type.includes(exercise.type) && area.includes(exercise.area) && gear.includes(exercise.gear)))

  return matchingExercises
}