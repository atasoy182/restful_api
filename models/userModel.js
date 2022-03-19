const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 50,
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
  { collection: "users", timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  userName: Joi.string().min(3).max(50).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().trim(),
});

// Yeni kullanıcı eklerken kullanılan validation
UserSchema.methods.joiValidation = function (userObj) {
  joiSchema.required();
  return joiSchema.validate(userObj);
};

// Kullanıcı güncellenirken kullanılan validation
UserSchema.statics.joiValidationForUpdate = function (userObj) {
  return joiSchema.validate(userObj);
};

UserSchema.methods.toJSON = function (){
  const user = this.toObject();
  delete user._id
  delete user.createdAt
  delete user.updatedAt
  delete user.__v
  delete user.password

  return user
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
