const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const Schema = mongoose.Schema;
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = require("./secretkey");

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
      minlength: 6,
    },
    isAdmin : {
      type : Boolean,
      default : false
    }
  },
  { collection: "users", timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(50).trim(),
  userName: Joi.string().min(3).max(50).trim(),
  email: Joi.string().trim().email(),
  password: Joi.string().min(6).trim(),
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

UserSchema.statics.login = async (email, password) => {
  const { error, value } = joiSchema.validate({ email, password });

  if (error) {
    throw createHttpError(400, error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(400, "Email yada şifre hatalı");
  }
  const paswwordCheck = await bcrypt.compare(password, user.password);
  if (!paswwordCheck) {
    throw createHttpError(400, "Email yada şifre hatalı");
  }
  return user;
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user._id;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.__v;
  delete user.password;

  return user;
};

UserSchema.methods.generateToken = async function () {
  const loginUser = this;
  const token = await jwt.sign(
    {
      _id: loginUser._id,
    },
    secretkey,
    { expiresIn: "3h" }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
