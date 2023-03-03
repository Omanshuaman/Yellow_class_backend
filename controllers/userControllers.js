const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all the required fields.");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  bcrypt.hash(password, saltRounds, function (err, hash) {
    const newUser = new User({
      name: name,
      email: email,
      password: hash,
    });

    newUser.save(function (err) {
      if (err) {
        res.status(400);
        throw new Error("Failed to create user.");
      } else {
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          pic: newUser.pic,
          token: generateToken(newUser._id),
        });
      }
    });
  });
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials.");
  }
});
const getUser = asyncHandler(async (req, res) => {
  try {
    User.find({ _id: { _id: req.params.userId } }).then((results) => {
      res.send(results);
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers, getUser };
