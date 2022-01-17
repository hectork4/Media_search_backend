import User from "../models/User";
import Role from "../models/Role";
import jwt from 'jsonwebtoken'

import config from '../config'

export const signUp = async(req, res) =>{
    const {username, email, password, roles, favourites} = req.body;
    
    const userFound = await User.find({username})

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
        favourites,
    })

    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    if (userFound) return
    
    const userSaved = await newUser.save() ;

    const token = jwt.sign({ id: userSaved._id }, config.SECRET, {
        expiresIn: 86400, 
      });
    console.log(userSaved)

    res.status(200).json({token})
}

export const signIn = async(req, res) =>{
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    console.log(req, User)
    if(!userFound) return res.status(400).json({message: 'User not found'})
    if(!req.body.password) return res.status(401).json({token:null, message: 'Complete pass'}) 
    const validatePass = await User.comparePassword(req.body.password, userFound.password)
    if(!validatePass) return res.status(401).json({token:null, message: 'Invalid pass'})

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400, 
      });

    console.log(userFound)
    res.json({token})
}