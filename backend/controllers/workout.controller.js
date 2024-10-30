import Workouts from "../models/workout.models.js";
import mongoose from "mongoose";

//get all workouts
export const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workouts.find({user_id}).sort({ created_at: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get a single workout
export const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  try {
    const workout = await Workouts.findById(id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    } else {
      res.status(200).json(workout);
    }
  } catch (error) {
    console.log({ message: error.message });
  }
};

//craete a new workout
export const createWorkout = async (req, res) => {
  const { title, weigths, reps, sets, catagory } = req.body;
  //add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workouts.create({ title, weigths, reps, sets, catagory, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
  }

  const workout = await Workouts.findByIdAndDelete({ _id: id });

  if (!workout) {
    res.status(404).json({ message: "No Such Workout Found" });
  }

  res.status(200).json({ message: "Workout Deleted Successfully" });
};

//update a workout
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid ID" });
  }

  const workout = await Workouts.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    res.status(404).json({ message: "No Such Workout Found" });
  }

  res.status(200).json({ message: "Workout Updated Successfully" });
};
