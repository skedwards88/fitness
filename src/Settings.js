import React from "react";
import { Areas, Gears, Types } from "./categories";

function Checkbox({ name, checked }) {
  return (
    <div className="setting">
      <label htmlFor={name}>{name}</label>
      <input id={name} type="checkbox" defaultChecked={checked} />
    </div>
  );
}

export default function Settings({
  setShowSettings,
  dispatchWorkoutState,
  workoutState,
}) {
  function handleNewWorkout(event) {
    event.preventDefault();

    const newTotalSec = parseInt(event.target.elements.totalSec.value);
    const newIntervalSec = parseInt(event.target.elements.intervalSec.value);

    let newGear = [];
    Gears.forEach((gear) => {
      if (event.target.elements[gear].checked) {
        newGear.push(gear);
      }
    });

    let newType = [];
    Types.forEach((type) => {
      if (event.target.elements[type].checked) {
        newType.push(type);
      }
    });

    let newArea = [];
    Areas.forEach((area) => {
      if (event.target.elements[area].checked) {
        newArea.push(area);
      }
    });
    dispatchWorkoutState({
      action: "newWorkout",
      totalSec: newTotalSec,
      intervalSec: newIntervalSec,
      gear: newGear,
      type: newType,
      area: newArea,
    });

    setShowSettings(false);
  }

  return (
    <div id="settings">
      <form onSubmit={(event) => handleNewWorkout(event)}>
        <div>
          <div className="setting">
            <label htmlFor="totalSec">Total (min)</label>
            <select id="totalSec" defaultValue={workoutState.totalSec}>
              <option value={3 * 60}>3</option>
              <option value={5 * 60}>5</option>
              <option value={10 * 60}>10</option>
              <option value={20 * 60}>20</option>
              <option value={30 * 60}>30</option>
            </select>
          </div>

          <div className="setting">
            <label htmlFor="intervalSec">Interval (sec)</label>
            <select id="intervalSec" defaultValue={workoutState.intervalSec}>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
            </select>
          </div>

          <div className="setting-group">
            {Gears.map((gear) => (
              <Checkbox
                key={gear}
                name={gear}
                checked={workoutState.gear.includes(gear)}
              ></Checkbox>
            ))}
          </div>

          <div className="setting-group">
            {Types.map((type) => (
              <Checkbox
                key={type}
                name={type}
                checked={workoutState.type.includes(type)}
              ></Checkbox>
            ))}
          </div>

          <div className="setting-group">
            {Areas.map((area) => (
              <Checkbox
                key={area}
                name={area}
                checked={workoutState.area.includes(area)}
              ></Checkbox>
            ))}
          </div>
        </div>
        <div className="button-group">
          <button type="submit">Start</button>
          <button type="button" onClick={() => setShowSettings(false)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
