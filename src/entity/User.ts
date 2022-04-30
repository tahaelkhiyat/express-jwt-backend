import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import Role from "./Role"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    normalizedUsername: string

    @Column()
    password: string

    @ManyToMany(() => Role, role => role.users)
    @JoinTable()
    roles: Role[]

}
