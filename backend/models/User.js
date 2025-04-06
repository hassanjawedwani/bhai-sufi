import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 character long"],
    select: false,
  },

}, { timestamps: true });

userSchema.methods.comparePassword = async function (clientUnhashedPassword) {
  return bcrypt.compare(clientUnhashedPassword, this.password);
}

const User = model("User", userSchema);

export default User;