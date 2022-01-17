import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config"

export const createUser = (req, res) => {
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

    User.encryptPassword(user.password).then((npass) => user.password = npass);

    return user.save().then((savedUser) => res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
      favourites: savedUser.favourites
    }));
  } catch (error) {
    console.error(error);
  }
};

export const getUser = (req, res) => {
  let token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.SECRET);
  User.findById(decoded.id).then((userData) => res.json(userData))
};

export const updateUser = (req, res) => {
  let token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, config.SECRET);
  User.findByIdAndUpdate(decoded.id, req.body,{
    new: true
  }).then((updatedUser) => res.status(200).json(updatedUser));
};

//export const getUsers = async (req, res) => {};