import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import pkg from '../package.json'

import { createRoles } from './libs/initialSetup'

import productRoutes from './routes/product.route'
import authRoutes from './routes/auth.route'
import userRoutes from './routes/user.route'

const app = express()
createRoles()
 
app.set('pkg', pkg);

app.use(morgan('dev'));
app.use(cors()); 
app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        version: pkg.version,
        description: pkg.description
    })
})

app.use('/products',productRoutes) 
app.use('/auth',authRoutes)
app.use('/user',userRoutes)

export default app;