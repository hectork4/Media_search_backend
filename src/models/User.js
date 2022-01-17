import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId, 
        ref: "Role", 
      },
    ],
    favourites: {
        img: [
            {
                type: String
            },
          ],
        gif: [
            {
              type: String
            },
          ]
      },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = (password) => {  
  return bcrypt.genSalt(10).then((salt) => {
    return bcrypt.hash(password, salt).then((resp) =>{
      console.log({resp})
      return resp
    }); 
  });    
};

userSchema.statics.comparePassword = (password, receivedPassword) => {
  return bcrypt.compare(password, receivedPassword).then((res) => res)
}

export default model("User", userSchema);