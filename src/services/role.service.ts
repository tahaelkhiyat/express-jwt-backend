import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Role from "../entity/Role";

export default class RoleService {
    private static roleRepo: Repository<Role> = AppDataSource.getRepository(Role)

    static async all(): Promise<Role[]> {
        return await this.roleRepo.find()
    }

    static async findOneByName(name: string): Promise<Role> {
        let normalizedName = name.toUpperCase()
        return await this.roleRepo.findOne({where: {normalizedName}})
    }

    static async create(name: string): Promise<Role> {
        let normalizedName = name.toUpperCase()
        let tmp = await this.roleRepo.findOne({where:{normalizedName}})
        if(tmp) return {id:0} as Role
        try {
            return await this.roleRepo.save({name, normalizedName})
        } catch(err) {
            console.log(err)
            return {id:-1} as Role
        }
    }
}