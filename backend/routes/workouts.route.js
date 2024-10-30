import express from "express";
import requireAuth from "../middelware/requireAuth.js";
import {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workout.controller.js";


const router = express.Router();

// Apply requireAuth middleware to all workout routes
router.use(requireAuth);

// Get all workouts
router.get("/", getAllWorkouts);

// Get a single workout (ensure that `getWorkout` has error handling for invalid ID format)
router.get("/:id", getWorkout);

// Create a new workout
router.post("/", createWorkout);

// Delete a workout by ID
router.delete("/:id", deleteWorkout);

// Update a workout by ID
router.patch("/:id", updateWorkout);

export default router;
