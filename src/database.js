import mongoose, { mongo } from "mongoose";
import config from './config'

const connectionString = config.MONGODB_URI

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Db is connected"))
.catch(error => console.log(error))