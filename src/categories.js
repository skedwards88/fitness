import exercises from "./exercises.json";

function buildCategories() {
  let gears = new Set();
  let areas = new Set();
  let types = new Set();

  exercises.forEach((exercise) => {
    gears.add(exercise.gear);
    areas.add(exercise.area);
    types.add(exercise.type);
  });

  return {
    Gears: Array.from(gears),
    Areas: Array.from(areas),
    Types: Array.from(types),
  };
}

export const {Gears, Areas, Types} = buildCategories();
