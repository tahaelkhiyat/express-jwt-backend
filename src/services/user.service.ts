import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import RoleService from "./role.service";

export default class UserService {

    private static userRepo: Repository<User> = AppDataSource.getRepository(User)

    static async all(): Promise<User[]> {
        return await this.userRepo.find({relations: ['roles']})
    }

    static async findOneById(id: number): Promise<User> {
        return await this.userRepo.findOne({where:{id}, relations: ['roles']})
    }

    static async removeUserFromRole(userId: number, roleName: string): Promise<AddUserToRoleResponse> {
        let user = await this.findOneById(userId)
        if(!user) return AddUserToRoleResponse.UserNotFound
        let role = await RoleService.findOneByName(roleName)
        if(!role) return AddUserToRoleResponse.RoleNotFound
        try {
            user.roles = user.roles.filter(el => el.normalizedName != roleName.toUpperCase())
            await this.userRepo.save(user)
            return AddUserToRoleResponse.Success
        } catch(err) {
            console.log(err)
            return AddUserToRoleResponse.Error
        }
    }

    static async addUserToRole(userId: number, roleName: string): Promise<AddUserToRoleResponse> {
        let user = await this.findOneById(userId)
        if(!user) return AddUserToRoleResponse.UserNotFound
        let role = await RoleService.findOneByName(roleName)
        if(!role) return AddUserToRoleResponse.RoleNotFound
        try {
            user.roles.push(role)
            await this.userRepo.save(user)
            return AddUserToRoleResponse.Success
        } catch(err) {
            console.log(err)
            return AddUserToRoleResponse.Error
        }
    }

}

export enum AddUserToRoleResponse {
    UserNotFound,
    RoleNotFound,
    Success,
    Error
}