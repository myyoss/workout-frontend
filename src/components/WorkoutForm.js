import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const hadleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, repetitions };

    const response = await fetch("https://workout-back.onrender.com/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(`${json.error} ${json.emptyFields.join(", ")}. `);
      setEmptyFields(json.emptyFields);
      // console.log(json.emptyFields, "json.emptyFields");
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setRepetitions("");
      setEmptyFields([]);
      console.log("new workout added", json);
      //   window.location.reload();
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="creat" onSubmit={hadleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (in Kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Repetitions:</label>
      <input
        type="number"
        onChange={(e) => setRepetitions(e.target.value)}
        value={repetitions}
        className={emptyFields.includes("repetitions") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
