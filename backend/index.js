import express from "express";
import { userRouter } from "./src/routes/user.js";
import { env } from './src/config/env.js';
import { connectDb, disconnectDb } from './src/config/db.js';
import cors from "cors"
import { movieRouter } from "./src/routes/movie.js";
import e from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('public/uploads'));

app.use(cors({
  credentials:true,
  origin:["http://localhost:5173", "http://localhost:5174"]
}))

app.use("/auth", userRouter);
app.use("/movies", movieRouter)

app.listen(env.PORT, async () => {
  console.log(`Server started on: http://localhost:${env.PORT}`)
  await connectDb()
  console.log("Mongo Connected!")
})

process.on('SIGINT', () => disconnectDb())
process.on('SIGTERM', () => disconnectDb())
