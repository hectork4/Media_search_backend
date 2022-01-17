import Role from "../models/Role";
import User from "../models/User";

import bcrypt from "bcryptjs";

export const createRoles = () => {
  try {
    Role.estimatedDocumentCount().then((count) => {
      if (count > 0) return;

      Promise.all([ 
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]).then((values) => {
        console.log(values);
      })
    });
   
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = () => {
  User.findOne({ email: "admin@localhost" }).then((user) => {
    Role.find({ name: { $in: ["admin", "moderator"] } }).then((roles) => {
      bcrypt.hash("admin", 10).then((pass) => {
        if (!user) {
          User.create({
            username: "admin",
            email: "admin@localhost",
            password: pass,
            roles: roles.map((role) => role._id),
          }).then(() => console.log('Admin User Created!'));
        }
      })
    })
  });
};