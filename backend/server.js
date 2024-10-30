import express from "express";
import dotenv from "dotenv";
import workoutRouter from "./routes/workouts.route.js";
import userRouter from './routes/user.routes.js'
import mongoose from "mongoose";
import profileRouter from './routes/profile.routes.js'

//express app creation
const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//routes
app.use("/api/workouts", workoutRouter);
app.use('/api/auth', userRouter);
app.use('/api/profile', profileRouter);

//connecting to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

//listening to request
app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}!!!`);
});
