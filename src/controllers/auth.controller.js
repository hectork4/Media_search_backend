import User from "../models/User";
import Role from "../models/Role";
import jwt from 'jsonwebtoken'

import config from '../config'

const generateToken = (user) => {
  user.save().then((res)=>{
    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
      expiresIn: 86400, 
    });
    console.log(res)

    res.status(200).json({token})
  }) ;
}

export const signUp = (req, res) =>{
    const {username, email, password, roles, favourites} = req.body;
    
    User.find({username}).then((userFound) => {
      User.encryptPassword(password).then((pass) => {
        const newUser = new User({
            username,
            email,
            password: pass,
            favourites,
        });

        if (req.body.roles) {
          Role.find({ name: { $in: roles } }).then((foundRoles)=>{
            newUser.roles = foundRoles.map((role) => role._id);
            generateToken(newUser);
          });          
        } else {
          Role.findOne({ name: "user" }).then((role) => {
            newUser.roles = [role._id];
            generateToken(newUser);
          });          
        }
        if (userFound) return
      })
    })


    
    

}

export const signIn = (req, res) =>{
    
    User.findOne({email: req.body.email}).populate("roles").then((userFound) => {
      console.log(req, User)
      if(!userFound) return res.status(400).json({message: 'User not found'});
      if(!req.body.password) return res.status(401).json({token:null, message: 'Complete pass'});


      User.c
      User.comparePassword(req.body.password, userFound.password).then((validatePass) => {
        if(!validatePass) return res.status(401).json({token:null, message: 'Invalid pass'})

        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
          expiresIn: 86400, 
        });
  
        console.log(userFound)
        res.json({token})
      })
    })
}