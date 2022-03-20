const User = require("../models/userModel");
const createHttpError = require("http-errors");
const bcrypt = require("bcrypt");

const listAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
};

const userDetails = (req, res) => {
  res.json(req.user);
};

const updateLoggedUser = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  const { error, value } = User.joiValidationForUpdate(req.body);

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }

  if (error) {
    next(createHttpError(400, error));
  } else {
    try {
      const response = await User.findByIdAndUpdate(
        { _id: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
      if (response) {
        return res.json(response);
      } else {
        throw new Error("Kullanıcı bulunamadı");
      }
    } catch (e) {
      next(e);
    }
  }
};

const createNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const { error, value } = newUser.joiValidation(req.body);
    if (error) {
      next(createHttpError(400, error));
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 8);
      const response = await newUser.save();
      res.json(response);
    }
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = await user.generateToken();
    res.json({
      user,
      token,
    });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  delete req.body.createdAt;
  delete req.body.updatedAt;

  const { error, value } = User.joiValidationForUpdate(req.body);

  if (req.body.hasOwnProperty("password")) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }

  if (error) {
    next(createHttpError(400, error));
  } else {
    try {
      const response = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (response) {
        return res.json(response);
      } else {
        throw new Error("Kullanıcı bulunamadı");
      }
    } catch (e) {
      next(e);
    }
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete({ _id: req.params.id });
    if (response) {
      return res.json({ message: "Kullanıcı silindi" });
    } else {
      throw createHttpError(404, "Kullanıcı Bulunamadı !");
    }
  } catch (e) {
    next(createHttpError(400, e));
  }
};

module.exports = {
  listAllUsers,
  userDetails,
  updateLoggedUser,
  createNewUser,
  login,
  updateUser,
  deleteUser,
};
