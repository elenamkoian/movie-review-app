import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  movie: Object,
  edited: Boolean,
});


export default model("Review", reviewSchema);