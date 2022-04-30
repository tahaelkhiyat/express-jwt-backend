import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import { jwtAuthMiddleware } from "./middleware/auth.middleware"
import * as authRouter from './routes/auth.route'
import * as roleRouter from './routes/role.route'
import * as userRouter from './routes/user.route'

AppDataSource.initialize().then(async () => {
    const express = require('express')
    const app = express()
    const dotenv = require('dotenv')
    dotenv.config()
    app.use(express.json())
    app.use('/auth', authRouter)
    app.use('/users', userRouter)
    app.use('/roles', roleRouter)
    app.get('/private', jwtAuthMiddleware(['admin']), (req, res) => res.end('private'))
    app.listen(5000, console.log('App started on port 5000'))
}).catch(error => console.log(error))

 
