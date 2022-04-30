import { NextFunction, Request, Response } from "express"
import * as jwt from 'jsonwebtoken'
import UserService from "../services/user.service"

export const jwtAuthMiddleware = (requiredRoles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token = req.headers.authorization?.split(' ')[1]
        if(!token) return res.status(401).end()
        try {
            let payload = jwt.verify(token, process.env.JWT_SECRET)
            if(requiredRoles.length == 0) next()
            let {id} = payload as jwt.JwtPayload
            let user = await UserService.findOneById(id)
            if(!user) return res.status(401).end()
            let counter = 0
            for(var i=0; i<requiredRoles.length; i++) {
                user.roles.forEach(userRole => {
                    if(userRole.normalizedName == requiredRoles[i].toUpperCase()) counter++
                })
            }
            if(counter == requiredRoles.length) next()
        } catch(err) {
            console.log(err)
        }
        return res.status(401).end()
    }
}