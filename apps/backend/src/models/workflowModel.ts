import { ObjectId } from "mongodb";
import { AppDataSource } from "../config/data-source";
import { Workflow } from "../entities/Workflow";
import { WorkflowData } from "types";

export class WorkflowModel {
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

    async getWorkflow(workflowId: string) {
        return await this.workflowRepo.findOne({
            where: {
                _id: new ObjectId(workflowId)
            }
        })
    }

    async updateWorkflow(workflowId: string, workflowData: Partial<WorkflowData>) {
        return await this.workflowRepo.updateOne(
            { _id: new ObjectId(workflowId) },
            { $set: workflowData }
        );
    }

    async deleteWorkflow(workflowId: string, userId: string) {
        return await this.workflowRepo.deleteOne({
            _id: new ObjectId(workflowId),
            userId
        });
    }

    async replaceWorkflow(workflowId: string, userId: string, workflowData: WorkflowData) {
        const result = await this.workflowRepo.updateOne(
            { _id: new ObjectId(workflowId), userId },
            { $set: { ...workflowData, updatedAt: new Date() } }
        );

        return result.modifiedCount > 0;
    }

    async findWorkflowByWebhookId(webhookId: string) {
        const allWorkflows = await this.workflowRepo.find();
        
        for (const workflow of allWorkflows) {
            console.log(workflow._id, workflow.nodes)
            const webhookTrigger = workflow.nodes.find((node) => 
                node.type === 'webhook-trigger' && 
                (node.data.webhookId === webhookId || node.data.id === webhookId)
            );
            
            if (webhookTrigger) {
                return workflow;
            }
        }
        
        return null;
    }

}
