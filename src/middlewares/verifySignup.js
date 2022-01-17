import User from "../models/User";
import { ROLES } from "../models/Role";

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  try {
    User.findOne({ username: req.body.email }).then((user) => {
      if (user)
        return res.status(400).json({ message: "The user already exists" });
      
      User.findOne({ email: req.body.email }).then((email) => {
        if (email)
          return res.status(400).json({ message: "The email already exists" });

          next();
      });      

    });

  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };