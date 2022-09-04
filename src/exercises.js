import cardio_upper_bodyWeight from "./exercises/cardio/upper/bodyWeight.json";
import cardio_upper_massageBall from "./exercises/cardio/upper/massageBall.json";
import cardio_upper_resistanceBands from "./exercises/cardio/upper/resistanceBands.json";
import cardio_lower_bodyWeight from "./exercises/cardio/lower/bodyWeight.json";
import cardio_lower_massageBall from "./exercises/cardio/lower/massageBall.json";
import cardio_lower_resistanceBands from "./exercises/cardio/lower/resistanceBands.json";
import cardio_core_bodyWeight from "./exercises/cardio/core/bodyWeight.json";
import cardio_core_massageBall from "./exercises/cardio/core/massageBall.json";
import cardio_core_resistanceBands from "./exercises/cardio/core/resistanceBands.json";

import stretch_upper_bodyWeight from "./exercises/stretch/upper/bodyWeight.json";
import stretch_upper_massageBall from "./exercises/stretch/upper/massageBall.json";
import stretch_upper_resistanceBands from "./exercises/stretch/upper/resistanceBands.json";
import stretch_lower_bodyWeight from "./exercises/stretch/lower/bodyWeight.json";
import stretch_lower_massageBall from "./exercises/stretch/lower/massageBall.json";
import stretch_lower_resistanceBands from "./exercises/stretch/lower/resistanceBands.json";
import stretch_core_bodyWeight from "./exercises/stretch/core/bodyWeight.json";
import stretch_core_massageBall from "./exercises/stretch/core/massageBall.json";
import stretch_core_resistanceBands from "./exercises/stretch/core/resistanceBands.json";

import strength_upper_bodyWeight from "./exercises/strength/upper/bodyWeight.json";
import strength_upper_massageBall from "./exercises/strength/upper/massageBall.json";
import strength_upper_resistanceBands from "./exercises/strength/upper/resistanceBands.json";
import strength_lower_bodyWeight from "./exercises/strength/lower/bodyWeight.json";
import strength_lower_massageBall from "./exercises/strength/lower/massageBall.json";
import strength_lower_resistanceBands from "./exercises/strength/lower/resistanceBands.json";
import strength_core_bodyWeight from "./exercises/strength/core/bodyWeight.json";
import strength_core_massageBall from "./exercises/strength/core/massageBall.json";
import strength_core_resistanceBands from "./exercises/strength/core/resistanceBands.json";

import massage_upper_bodyWeight from "./exercises/massage/upper/bodyWeight.json";
import massage_upper_massageBall from "./exercises/massage/upper/massageBall.json";
import massage_upper_resistanceBands from "./exercises/massage/upper/resistanceBands.json";
import massage_lower_bodyWeight from "./exercises/massage/lower/bodyWeight.json";
import massage_lower_massageBall from "./exercises/massage/lower/massageBall.json";
import massage_lower_resistanceBands from "./exercises/massage/lower/resistanceBands.json";
import massage_core_bodyWeight from "./exercises/massage/core/bodyWeight.json";
import massage_core_massageBall from "./exercises/massage/core/massageBall.json";
import massage_core_resistanceBands from "./exercises/massage/core/resistanceBands.json";

import { Area, Gear, Type } from "./categories";

export default function getExercisesForCategory({
  type = [],
  area = [],
  gear = [],
}) {
  type = type || [Type.cardio, Type.massage, Type.stretch, Type.strength];
  area = area || [Area.core, Area.lower, Area.upper];
  gear = gear || [Gear.bodyWeight, Gear.massageBall, Gear.resistanceBands];

  let exercises = [];

  for (let typeIndex = 0; typeIndex < type.length; typeIndex++) {
    for (let areaIndex = 0; areaIndex < area.length; areaIndex++) {
      for (let gearIndex = 0; gearIndex < gear.length; gearIndex++) {
        const identifier = `${type[typeIndex]}_${area[areaIndex]}_${gear[gearIndex]}`;
        if (identifier === "cardio_upper_bodyWeight") {
          exercises = [...exercises, ...cardio_upper_bodyWeight];
        } else if (identifier === "cardio_upper_massageBall") {
          exercises = [...exercises, ...cardio_upper_massageBall];
        } else if (identifier === "cardio_upper_resistanceBands") {
          exercises = [...exercises, ...cardio_upper_resistanceBands];
        } else if (identifier === "cardio_lower_bodyWeight") {
          exercises = [...exercises, ...cardio_lower_bodyWeight];
        } else if (identifier === "cardio_lower_massageBall") {
          exercises = [...exercises, ...cardio_lower_massageBall];
        } else if (identifier === "cardio_lower_resistanceBands") {
          exercises = [...exercises, ...cardio_lower_resistanceBands];
        } else if (identifier === "cardio_core_bodyWeight") {
          exercises = [...exercises, ...cardio_core_bodyWeight];
        } else if (identifier === "cardio_core_massageBall") {
          exercises = [...exercises, ...cardio_core_massageBall];
        } else if (identifier === "cardio_core_resistanceBands") {
          exercises = [...exercises, ...cardio_core_resistanceBands];
        } else if (identifier === "stretch_upper_bodyWeight") {
          exercises = [...exercises, ...stretch_upper_bodyWeight];
        } else if (identifier === "stretch_upper_massageBall") {
          exercises = [...exercises, ...stretch_upper_massageBall];
        } else if (identifier === "stretch_upper_resistanceBands") {
          exercises = [...exercises, ...stretch_upper_resistanceBands];
        } else if (identifier === "stretch_lower_bodyWeight") {
          exercises = [...exercises, ...stretch_lower_bodyWeight];
        } else if (identifier === "stretch_lower_massageBall") {
          exercises = [...exercises, ...stretch_lower_massageBall];
        } else if (identifier === "stretch_lower_resistanceBands") {
          exercises = [...exercises, ...stretch_lower_resistanceBands];
        } else if (identifier === "stretch_core_bodyWeight") {
          exercises = [...exercises, ...stretch_core_bodyWeight];
        } else if (identifier === "stretch_core_massageBall") {
          exercises = [...exercises, ...stretch_core_massageBall];
        } else if (identifier === "stretch_core_resistanceBands") {
          exercises = [...exercises, ...stretch_core_resistanceBands];
        } else if (identifier === "strength_upper_bodyWeight") {
          exercises = [...exercises, ...strength_upper_bodyWeight];
        } else if (identifier === "strength_upper_massageBall") {
          exercises = [...exercises, ...strength_upper_massageBall];
        } else if (identifier === "strength_upper_resistanceBands") {
          exercises = [...exercises, ...strength_upper_resistanceBands];
        } else if (identifier === "strength_lower_bodyWeight") {
          exercises = [...exercises, ...strength_lower_bodyWeight];
        } else if (identifier === "strength_lower_massageBall") {
          exercises = [...exercises, ...strength_lower_massageBall];
        } else if (identifier === "strength_lower_resistanceBands") {
          exercises = [...exercises, ...strength_lower_resistanceBands];
        } else if (identifier === "strength_core_bodyWeight") {
          exercises = [...exercises, ...strength_core_bodyWeight];
        } else if (identifier === "strength_core_massageBall") {
          exercises = [...exercises, ...strength_core_massageBall];
        } else if (identifier === "strength_core_resistanceBands") {
          exercises = [...exercises, ...strength_core_resistanceBands];
        } else if (identifier === "massage_upper_bodyWeight") {
          exercises = [...exercises, ...massage_upper_bodyWeight];
        } else if (identifier === "massage_upper_massageBall") {
          exercises = [...exercises, ...massage_upper_massageBall];
        } else if (identifier === "massage_upper_resistanceBands") {
          exercises = [...exercises, ...massage_upper_resistanceBands];
        } else if (identifier === "massage_lower_bodyWeight") {
          exercises = [...exercises, ...massage_lower_bodyWeight];
        } else if (identifier === "massage_lower_massageBall") {
          exercises = [...exercises, ...massage_lower_massageBall];
        } else if (identifier === "massage_lower_resistanceBands") {
          exercises = [...exercises, ...massage_lower_resistanceBands];
        } else if (identifier === "massage_core_bodyWeight") {
          exercises = [...exercises, ...massage_core_bodyWeight];
        } else if (identifier === "massage_core_massageBall") {
          exercises = [...exercises, ...massage_core_massageBall];
        } else if (identifier === "massage_core_resistanceBands") {
          exercises = [...exercises, ...massage_core_resistanceBands];
        }
      }
    }
  }

  return exercises;
}
