import { Schema, model } from "mongoose";

const favoriteItem = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  watched: Boolean,
  movie: Object,
  date: Date,
})

export default model("Favorite", favoriteItem)