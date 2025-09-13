import { ObjectId } from "mongodb";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

export class UserModel {
    private userRepo = AppDataSource.getMongoRepository(User)

    async createUser(email: string, password: string) {
        const newUser = this.userRepo.create({
            email, password
        })

        return await this.userRepo.save(newUser)
    }

    async findUser(email: string, password: string) {
        return await this.userRepo.findOne({
            where: { email, password }
        })
    }

    async findByID(userId: string) {
        return await this.userRepo.findOne({
            where: { _id: new ObjectId(userId) }
        })
    }
}