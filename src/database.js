import mongoose, { mongo } from "mongoose";
import config from './config'

const connectionString = config.MONGODB_URI

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}

mongoose.connect(connectionString, options)
.then(db => console.log("Db is connected"))
.catch(error => console.log(error))
