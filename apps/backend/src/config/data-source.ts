import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { User } from "../entities/User.js";
import "reflect-metadata";
import { Workflow } from "../entities/Workflow.js";
import { NodeEntity } from "../entities/Node.js";
import { ConnectionEntity } from "../entities/Connection.js";
import { Credential } from "../entities/Credentials.js";
import { Webhook } from "../entities/Webhook.js";

dotenv.config()

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URI,
    synchronize: true,
    logging: true,
    entities: [User, Workflow, NodeEntity, ConnectionEntity, Credential, Webhook]
})