import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
export default class AuthService {
    private static userRepo: Repository<User> = AppDataSource.getRepository(User)

    private constructor() {}

    static async register(username: string, password: string): Promise<User> {
        let normalizedUsername = username.toUpperCase()
        let tmp = await this.userRepo.findOne({where:{normalizedUsername}})
        if(tmp) return {id: 0} as User
        password = await bcrypt.hash(password, 10)
        let user = {username, normalizedUsername, password} as User
        try {
            return await this.userRepo.save(user)
        } catch(err) {
            console.log(err)
            return {id:-1} as User
        }
    }

    static async login(username: string, password: string): Promise<string> {
        let normalizedUsername = username.toUpperCase()
        let user = await this.userRepo.findOne({where:{normalizedUsername}})
        if(!user) return undefined
        let passwordIsValid = await bcrypt.compare(password, user.password)
        if(!passwordIsValid) return undefined
        let {id} = user
        let payload = {id, normalizedUsername}
        try {
            return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3D'})
        } catch(err) {
            console.log(err)
            return "500"
        }
    }
}