import React from "react";
import { Area, Gear, Type } from "./categories";

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
    if (event.target.elements[Gear.bodyWeight].checked) {
      newGear.push(Gear.bodyWeight);
    }
    if (event.target.elements[Gear.massageBall].checked) {
      newGear.push(Gear.massageBall);
    }
    if (event.target.elements[Gear.resistanceBands].checked) {
      newGear.push(Gear.resistanceBands);
    }

    let newType = [];
    if (event.target.elements[Type.cardio].checked) {
      newType.push(Type.cardio);
    }
    if (event.target.elements[Type.strength].checked) {
      newType.push(Type.strength);
    }
    if (event.target.elements[Type.stretch].checked) {
      newType.push(Type.stretch);
    }
    if (event.target.elements[Type.massage].checked) {
      newType.push(Type.massage);
    }

    let newArea = [];
    if (event.target.elements[Area.upper].checked) {
      newArea.push(Area.upper);
    }
    if (event.target.elements[Area.lower].checked) {
      newArea.push(Area.lower);
    }
    if (event.target.elements[Area.core].checked) {
      newArea.push(Area.core);
    }
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
              <option value={3}>3</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
          </div>

          <div className="setting-group">
            <div className="setting">
              <label htmlFor={Gear.bodyWeight}>Body weight</label>
              <input
                id={Gear.bodyWeight}
                type="checkbox"
                defaultChecked={workoutState.gear.includes(Gear.bodyWeight)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Gear.massageBall}>Massage ball</label>
              <input
                id={Gear.massageBall}
                type="checkbox"
                defaultChecked={workoutState.gear.includes(Gear.massageBall)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Gear.resistanceBands}>Resistance bands</label>
              <input
                id={Gear.resistanceBands}
                type="checkbox"
                defaultChecked={workoutState.gear.includes(
                  Gear.resistanceBands
                )}
              />
            </div>
          </div>

          <div className="setting-group">
            <div className="setting">
              <label htmlFor={Type.cardio}>Cardio</label>
              <input
                id={Type.cardio}
                type="checkbox"
                defaultChecked={workoutState.type.includes(Type.cardio)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Type.strength}>Strength</label>
              <input
                id={Type.strength}
                type="checkbox"
                defaultChecked={workoutState.type.includes(Type.strength)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Type.stretch}>Stretch</label>
              <input
                id={Type.stretch}
                type="checkbox"
                defaultChecked={workoutState.type.includes(Type.stretch)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Type.massage}>Massage</label>
              <input
                id={Type.massage}
                type="checkbox"
                defaultChecked={workoutState.type.includes(Type.massage)}
              />
            </div>
          </div>

          <div className="setting-group">
            <div className="setting">
              <label htmlFor={Area.upper}>Upper</label>
              <input
                id={Area.upper}
                type="checkbox"
                defaultChecked={workoutState.area.includes(Area.upper)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Area.lower}>Lower</label>
              <input
                id={Area.lower}
                type="checkbox"
                defaultChecked={workoutState.area.includes(Area.lower)}
              />
            </div>

            <div className="setting">
              <label htmlFor={Area.core}>Core</label>
              <input
                id={Area.core}
                type="checkbox"
                defaultChecked={workoutState.area.includes(Area.core)}
              />
            </div>
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
