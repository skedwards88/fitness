import React from "react";
import "./App.css";
import Workout from "./Workout";
import Home from "./Home";
import Settings from "./Settings";
import { Statuses } from "./statuses";
import workoutReducer from "./workoutReducer";
import workoutInit from "./workoutInit";

function App() {

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
