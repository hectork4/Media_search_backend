import config from "../config";
import User from "../models/User";
import Role from "../models/Role";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    let tokenReq = req.headers["x-access-token"];

    if (!tokenReq) return res.status(403).json({ message: "No token provided" });

     try {
        const decoded = jwt.verify(tokenReq, config.SECRET); 
        
        req.userId = decoded.id;

        User.findById(req.userId, { password: 0 }).then((user) => {
          if (!user) return res.status(404).json({ message: "No user found" });
          console.log(user)
          next();
        });

   } catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
}

export const isModerator = (req, res, next) => {
    try {
      return User.findById(req.userId).then((user) => {
        Role.find({ _id: { $in: user.roles } }).then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
          return res.status(403).json({ message: "Require Moderator Role!" });
        })
      }); 

    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };
  
  export const isAdmin = (req, res, next) => {
    try {
      User.findById(req.userId).then((user) => {
        Role.find({ _id: { $in: user.roles } }).then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }
      
          return res.status(403).json({ message: "Require Admin Role!" });
        })
      });

    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  };