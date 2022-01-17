import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config"

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const rolesFound = ['admin'] 
    
    const user = new User({
      username: email,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
      favourites:[]
    });

    user.password = await User.encryptPassword(user.password);

    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
      favourites: savedUser.favourites
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  let token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.SECRET);
  const userData = await User.findById(decoded.id)
  res.json(userData)
};

export const updateUser = async (req, res) => {
  let token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.SECRET);
  const updatedUser = await User.findByIdAndUpdate(decoded.id, req.body,{
    new: true
  });
  res.status(200).json(updatedUser);
};

export const getUsers = async (req, res) => {};