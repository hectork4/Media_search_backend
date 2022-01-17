import app from './app'
import config from './config'
import './database'

app.listen(config.PORT)
console.log("server listen on port", 4000)