import { ObjectId } from "mongodb";
import { AppDataSource } from "../config/data-source";
import { Credential } from "../entities/Credentials";
import { CredentialTypes } from "types";

export class CredentialModel {
    private credRepo = AppDataSource.getMongoRepository(Credential);

    async createCred(data: CredentialTypes) {
        const newCred = this.credRepo.create({
            userId: data.userId,
            app: data.app,
            key: data.key
        });
        return await this.credRepo.save(newCred);
    }

    async getAllCreds(userId: string) {
        return await this.credRepo.find({
            where: { userId },
            order: { _id: "DESC" }
        });
    }

    async getCred(userId: string, credId: string) {
        return await this.credRepo.findOne({
            where: {
                userId,
                _id: new ObjectId(credId)
            }
        });
    }

    async updateCred(credId: string, userId: string, data: Partial<CredentialTypes>) {
        return await this.credRepo.updateOne(
            { _id: new ObjectId(credId), userId },
            { $set: data }
        );
    }

    async deleteCred(credId: string, userId: string) {
        return await this.credRepo.deleteOne({
            _id: new ObjectId(credId),
            userId
        });
    }
}
