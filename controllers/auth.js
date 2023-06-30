const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  console.log("aooo");

  const { name, lastName, email, location } = req.body;
  if (!name || !lastName || !email || !location) {
    return BadRequestError("please fill out all fields here");
  }
  console.log(req.user.userId);
  const user = await User.findOne({ _id: req.user.userId });
  console.log("user", user);
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;
  const token = user.createJWT();
  await user.save();
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      token,
    },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
