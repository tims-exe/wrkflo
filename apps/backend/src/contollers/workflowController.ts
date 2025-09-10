import { ObjectId } from "mongodb";
import { AppDataSource } from "../config/data-source";
import { Workflow } from "../entities/Workflow";
import { WorkflowData } from "types";

export class WorkflowController {
    private workflowRepo = AppDataSource.getMongoRepository(Workflow);

    async createWorkflow(workflowData: WorkflowData) {
        console.log(workflowData);
        const newWorkflow = this.workflowRepo.create(workflowData);
        return await this.workflowRepo.save(newWorkflow);
    }

    async getAllWorkflows(userId: string) {
        return await this.workflowRepo.find({
            where: { userId },
            order: { createdAt: "DESC" }
        });
    }

    async getWorkflow(userId: string, workflowId: string) {
        return await this.workflowRepo.findOne({
            where: {
                userId,
                _id: new ObjectId(workflowId)
            }
        })
    }
}
