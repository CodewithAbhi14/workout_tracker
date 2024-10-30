import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext} from "../hooks/useAuthContext";

const WorkoutForm = () => {  // Component name should start with an uppercase letter

  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [weigths, setWeights] = useState("");
  const [sets, setSets] = useState("");
  const [catagory, setCatagory] = useState("");
  const [error, setError] = useState(null);  // Optional: state for error handling
  const {user} = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user){
      setError("Please login to add a workout");  // Optional: set error message and displa
    }
    const workout = { title, weigths, reps, sets, catagory };
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
       },
      body: JSON.stringify(workout)
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);  // Store error message for display
      alert(json.error.message);  // Optional alert
    }

    if (response.ok) {
      console.log('Workout added successfully');
      setTitle('');  // Reset form fields
      setReps('');
      setWeights('');
      setSets('');
      setCatagory('');
      setError(null);  // Clear any previous errors
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="p-5 mx-auto ">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <h3 className="text-md font-bold text-center">Add a new workout</h3>
        <hr className="w-2/2 border-2 border-gray-500 my-2"/>
        {error && <p className="text-red-500">{error}</p>}  {/* Display error message if any */}
        
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border-2 rounded-md w-full"
        />
        
        <label>Exercise Catagory:</label>
        <select
          onChange={(e) => setCatagory(e.target.value)}
          value={catagory}
          className="border-2 rounded-md w-full py-1"
        >
          <option value="" disabled>Select category</option>
          <option value="Chest">Chest</option>
          <option value="Back">Back</option>
          <option value="Shoulders">Shoulders</option>
          <option value="Biceps">Biceps</option>
          <option value="Triceps">Triceps</option>
          <option value="Legs">Legs</option>
          <option value="Core">Core</option>
        </select>
        
        <label>Exercise Weights (in kg):</label>
        <input
          type="number"
          onChange={(e) => setWeights(e.target.value)}
          value={weigths}
          className="border-2 rounded-md w-full"
        />
        
        <label>Exercise Sets:</label>
        <input
          type="number"
          onChange={(e) => setSets(e.target.value)}
          value={sets}
          className="border-2 rounded-md w-full"
        />

        <label>Exercise Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className="border-2 rounded-md w-full"
        />
        
        <button className="bg-green-500 text-white rounded-md w-full py-1 hover:opacity-85 mt-3">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default WorkoutForm;
