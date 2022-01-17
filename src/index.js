import app from './app'
import config from './config'
//import './database'
import mongoose, { mongo } from "mongoose";

const connectionString = config.MONGODB_URI

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}

mongoose.connect(connectionString, options)
.then(db => {
    console.log("Db is connected")
    app.listen(config.PORT)
    console.log("server listen on port", 4000)  
})
.catch(error => console.log(error))

