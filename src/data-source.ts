import "reflect-metadata"
import { DataSource } from "typeorm"
import Role from "./entity/Role"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "app.db",
    synchronize: true,
    logging: false,
    entities: [User, Role],
    migrations: [],
    subscribers: [],
})
