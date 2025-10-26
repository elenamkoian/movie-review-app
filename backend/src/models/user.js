import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: [true, "Please provide name"] },
  surname: { type: String, required: [true, "Please provide surnmae"] },
  login: { type: String, required: [true, "Please provide login"], unique: [true, "Login is busy"] },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: [6, "Password is too short"]
  },
  avatar: { type: String, default: "" }
})

export default model("User", UserSchema);