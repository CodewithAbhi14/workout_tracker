import { useState, useEffect } from "react";
import WorkoutDetails from "../components/workoutDetails";
import WorkoutForm from "../components/workoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const [category, setCategory] = useState("All");
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("/api/workouts", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const json = await response.json();
        dispatch({ type: "SET_WORKOUTS", payload: json });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const filteredWorkouts =
    category === "All"
      ? workouts
      : workouts?.filter((workout) => workout.catagory === category);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-10rem)] pt-10 pb-4 bg-gray-50 mt-20 ">
      {/* Categories Filter Section */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {[
          "All",
          "Chest",
          "Back",
          "Shoulders",
          "Biceps",
          "Triceps",
          "Legs",
          "Core",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
              category === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <hr className="border-gray-300 mb-4" />

      {/* Workouts List and Form Section */}
      <div className="flex flex-col md:flex-row w-full h-full">
        {/* Workouts Display */}
        <div className="w-full md:w-3/4 lg:w-2/3 bg-white border border-gray-200 shadow-md rounded-xl p-5 ">
          <div className="max-h-[65vh] overflow-y-auto hide-scrollbar p-2 space-y-4 cont" >
            {filteredWorkouts &&
              filteredWorkouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </div>
        </div>

        {/* Workout Form */}
        <div className="w-full md:w-1/4 lg:w-1/3 md:mt-0 md:ml-6">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
