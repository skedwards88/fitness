const muscles = {
  triceps: "triceps",
  biceps: "biceps",
  deltoids: "deltoids",
  latissimus: "latissimus",
  trapezius: "trapezius",
  pectoralis: "pectoralis",
  quads: "quadriceps",
  hamstrings: "hamstrings",
  gluteus: "gluteus",
  calves: "calves",
  shin: "shin",
  arch: "arch",
  abductors: "abductors",
  adductors: "adductors",
  hipFlexors: "hipFlexors",
  abs: "abs",
  obliques: "obliques",
  forearm: "forearm",
  heart: "heart",
}

const equipment = {
  none: "none",
  bands: "resistance bands",
  massageBall: "massage ball"
}

const types = {
  cardio: "cardio",
  strength: "strength",
  stretch: "stretch",
}

const exercises = [
  {
    name: "push-ups",
    description: "",
    variations: ["normal", "tricep", "diamond"],
    type: types.strength,
    primaryMuscle: muscles.pectoralis,
    equipment: equipment.none
  },
  {
    name: "chest press",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.pectoralis,
    equipment: equipment.bands
  },
  {
    name: "fly",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.pectoralis,
    equipment: equipment.bands
  },
  {
    name: "rows",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.trapezius,
    equipment: equipment.bands
  },
  {
    name: "overhead press",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.deltoids,
    equipment: equipment.bands
  },
  {
    name: "down dog pushups",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.deltoids,
    equipment: equipment.none
  },
  {
    name: "shoulder raises",
    description: "",
    variations: ["to side", "to front"],
    type: types.strength,
    primaryMuscle: muscles.deltoids,
    equipment: equipment.bands
  },
  {
    name: "reverse fly",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.trapezius,
    equipment: equipment.bands
  },
  {
    name: "overhead pull downs (pull ups)",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.latissimus,
    equipment: equipment.bands
  },
  {
    name: "bicep curls",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.biceps,
    equipment: equipment.bands
  },
  {
    name: "tricep curls",
    description: "",
    variations: ["overhead", "kick backs"],
    type: types.strength,
    primaryMuscle: "",
    equipment: equipment.bands
  },
  {
    name: "dips",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.triceps,
    equipment: equipment.none
  },
  {
    name: "wrist curls",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.forearm,
    equipment: equipment.bands
  },
  {
    name: "reverse wrist curls",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.forearm,
    equipment: equipment.bands
  },
  {
    name: "squats",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.quads,
    equipment: equipment.none
  },
  {
    name: "calf raises",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.calves,
    equipment: equipment.none
  },
  {
    name: "hamstring kickbacks",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.bands
  },
  {
    name: "dead lifts",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.none
  },
  {
    name: "bridge lifts",
    description: "",
    variations: ["single leg", "feet elevated", "normal", "wide legs"],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.none
  },
  {
    name: "pectoral stretch (happy saguaro)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.pectoralis,
    equipment: equipment.none
  },
  {
    name: "trapezius stretch (todo)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.trapezius,
    equipment: equipment.none
  },
  {
    name: "deltoids stretch (todo)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.deltoids,
    equipment: equipment.none
  },
  {
    name: "lats stretch (todo)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.latissimus,
    equipment: equipment.none
  },
  {
    name: "biceps stretch (todo)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.biceps,
    equipment: equipment.none
  },
  {
    name: "tricep stretch (todo)",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.triceps,
    equipment: equipment.none
  },
  {
    name: "quad stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.quads,
    equipment: equipment.none
  },
  {
    name: "calf stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.calves,
    equipment: equipment.none
  },
  {
    name: "hamstring stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.none
  },
  {
    name: "hip flexor stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.hipFlexors,
    equipment: equipment.none
  },
  {
    name: "glute stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.gluteus,
    equipment: equipment.none
  },
  {
    name: "obliques stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.obliques,
    equipment: equipment.none
  },
  {
    name: "abs stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },
  {
    name: "abductors stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.abductors,
    equipment: equipment.none
  },
  {
    name: "adductors stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.adductors,
    equipment: equipment.none
  },
  {
    name: "shin stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.shin,
    equipment: equipment.none
  },
  {
    name: "arch stretch",
    description: "",
    variations: [],
    type: types.stretch,
    primaryMuscle: muscles.arch,
    equipment: equipment.none
  },

  {
    name: "pectoral massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.pectoralis,
    equipment: equipment.massageBall
  },
  {
    name: "trapezius massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.trapezius,
    equipment: equipment.massageBall
  },
  {
    name: "deltoids massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.deltoids,
    equipment: equipment.massageBall
  },
  {
    name: "lats massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.latissimus,
    equipment: equipment.massageBall
  },
  {
    name: "biceps massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.biceps,
    equipment: equipment.massageBall
  },
  {
    name: "tricep massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.triceps,
    equipment: equipment.massageBall
  },
  {
    name: "quad massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.quads,
    equipment: equipment.massageBall
  },
  {
    name: "calf massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.calves,
    equipment: equipment.massageBall
  },
  {
    name: "hamstring massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.massageBall
  },
  {
    name: "hip flexor massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.hipFlexors,
    equipment: equipment.massageBall
  },
  {
    name: "glute massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.gluteus,
    equipment: equipment.massageBall
  },
  {
    name: "obliques massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.obliques,
    equipment: equipment.massageBall
  },
  {
    name: "abs massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.abs,
    equipment: equipment.massageBall
  },
  {
    name: "abductors massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.abductors,
    equipment: equipment.massageBall
  },
  {
    name: "adductors massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.adductors,
    equipment: equipment.massageBall
  },
  {
    name: "shin massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.shin,
    equipment: equipment.massageBall
  },
  {
    name: "arch massage",
    description: "",
    variations: [],
    type: types.massage,
    primaryMuscle: muscles.arch,
    equipment: equipment.massageBall
  },
  {
    name: "donkey kicks",
    description: "On hands and knees, knee bent, foot to sky, kick up",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.none
  },
  {
    name: "fire hydrants",
    description: "On hands and knees, lift knee out to side",
    variations: ["normal", "straighten leg at end of kick"],
    type: types.strength,
    primaryMuscle: muscles.abductors,
    equipment: equipment.none
  },
  {
    name: "clams",
    description: "",
    variations: ["normal", "knee and toe taps", "circles"],
    type: types.strength,
    primaryMuscle: muscles.abductors,
    equipment: equipment.none
  },
  {
    name: "outer hip with band",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.abductors,
    equipment: equipment.bands
  },
  {
    name: "inner hip with band",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.adductors,
    equipment: equipment.bands
  },
  {
    name: "front hip with band",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.hipFlexors,
    equipment: equipment.bands
  },
  {
    name: "back hip with band",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.bands
  },
  {
    name: "leg lift to side",
    description: "",
    variations: ["warrior 3", "standing", "laying"],
    type: types.strength,
    primaryMuscle: muscles.abductors,
    equipment: equipment.none
  },
  {
    name: "leg lift to inside",
    description: "",
    variations: ["warrior 3", "standing", "laying"],
    type: types.strength,
    primaryMuscle: muscles.adductors,
    equipment: equipment.none
  },
  {
    name: "leg lift to front",
    description: "",
    variations: ["warrior 3", "standing", "laying"],
    type: types.strength,
    primaryMuscle: muscles.hipFlexors,
    equipment: equipment.none
  },
  {
    name: "leg lift to back",
    description: "",
    variations: ["warrior 3", "standing", "laying"],
    type: types.strength,
    primaryMuscle: muscles.hamstrings,
    equipment: equipment.none
  },
  {
    name: "spider walk",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.abductors,
    equipment: equipment.none
  },
  {
    name: "jumping jacks",
    description: "",
    variations: [],
    type: types.cardio,
    primaryMuscle: muscles.heart,
    equipment: equipment.none
  },
  {
    name: "crunches",
    description: "",
    variations: ["regular", "fingers to sky", "fingers to feet along ground", "knees up", "legs up", "legs up touch toes"],
    type: types.strength,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },
  {
    name: "oblique crunches",
    description: "",
    variations: ["hips to one side", "elbow to knee", "fingers to feet along ground", "knees up", "legs up", "legs up touch toes"],
    type: types.strength,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },
  {
    name: "reverse crunches",
    description: "",
    variations: [],
    type: types.strength,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },
  {
    name: "leg lifts",
    description: "",
    variations: ["normal","wide legs","criss-cross up and down","alphabet","circles","flutter kicks","partner throwdown (todo make equipment partner?)","crucifixions","side to side"],
    type: types.strength,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },
  {
    name: "plank",
    description: "",
    variations: ["forearm","hands","step side-side", "tap hips side-side","knee to elbow","knee to opposite elbow","hand taps shoulder","partner hand taps","one arm side-side","side plank","side plank with hips up and down"],
    type: types.strength,
    primaryMuscle: muscles.abs,
    equipment: equipment.none
  },

]

