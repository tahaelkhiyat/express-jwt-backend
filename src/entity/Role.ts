import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string
    
    @Column({unique: true})
    normalizedName: string

    @ManyToMany(() => User, user => user.roles, {cascade: true})
    users: User[]
}