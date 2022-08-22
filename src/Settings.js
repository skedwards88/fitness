import React from "react";

export default function Settings({
  setShowSettings,
  dispatchWorkoutState,
  workoutState,
}) {
  function handleNewWorkout(event) {
    event.preventDefault();

    const newTotalSec = parseInt(event.target.elements.totalSec.value);
    const newIntervalSec = parseInt(event.target.elements.intervalSec.value);

    dispatchWorkoutState({
      action: "reset",
      totalSec: newTotalSec,
      intervalSec: newIntervalSec,
    });

    setShowSettings(false);
  }

  return (
    <div>
      Settings
      <form onSubmit={(event) => handleNewWorkout(event)}>
        <div>
          <label htmlFor="totalSec">Total</label>
          <select id="totalSec" defaultValue={workoutState.totalSec || 5 * 60}>
            <option value={3 * 60}>3</option>
            <option value={5 * 60}>5</option>
            <option value={10 * 60}>10</option>
          </select>

          <label htmlFor="intervalSec">Total</label>
          <select
            id="intervalSec"
            defaultValue={workoutState.intervalSec || 15}
          >
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={45}>45</option>
          </select>
        </div>
        <button type="submit">Start</button>
        <button type="button" onClick={() => setShowSettings(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}