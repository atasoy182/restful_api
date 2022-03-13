
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "users", timestamps : true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User