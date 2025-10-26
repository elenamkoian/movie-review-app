import express from "express";
import { userRouter } from "./src/routes/user.js";
import { env } from './src/config/env.js';
import { connectDb, disconnectDb } from './src/config/db.js';
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded());

//should be cors first than the routers info
app.use(cors({
  credentials:true,
  origin:["http://localhost:5173", "http://localhost:5174"]
}))

app.use("/auth", userRouter);

app.listen(env.PORT, async () => {
  console.log(`Server started on: http://localhost:${env.PORT}`)
  await connectDb()
  console.log("Mongo Connected!")
})

process.on('SIGINT', () => disconnectDb())
process.on('SIGTERM', () => disconnectDb())


