import { Router } from "express";
import { UserModel } from "../models/userModel";
import { WorkflowModel } from "../models/workflowModel";
import { WorkflowData } from "types";
import { authMiddleware } from "./authMiddleware";


export const workflowRouter: Router = Router()
const userModel = new UserModel()
const workflowModel = new WorkflowModel()

workflowRouter.get('/', async (req, res) => {
    console.log('GET /api/v1/workflow/');

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    try {
        const workflows = await workflowModel.getAllWorkflows(req.userId);

        return res.json({
            success: true,
            workflows
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching workflows"
        });
    }
});


// new workflow
workflowRouter.post('/', async (req, res) => {
    console.log('POST /api/v1/workflow/')
    if (!req.userId) return;

    const data = req.body
    const user = await userModel.findByID(req.userId)

    if (!user) {
        return res.json({
            success: false,
            message: "no userId found in token",
        });
    }
    const currentWorkflow: WorkflowData = {
        userId: user._id.toString(),
        name: data.name,
        enabled: data.enabled,
        nodes: data.nodes,
        connections: data.connections,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
    const workflow = await workflowModel.createWorkflow(currentWorkflow)

    if (workflow) {
        return res.json({
            success: true,
            message: "workflow created",
            id: workflow._id.toString()
        })
    }

    return res.json({
        success: false,
        message: "error creating workflow"
    })
})


// get workflow nodes and edges
workflowRouter.get('/:id', async (req, res) => {
    console.log(`GET /api/v1/workflow/${req.params.id}`);

    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    const workflowId = req.params.id;

    try {
        const workflow = await workflowModel.getWorkflow(workflowId);

        if (!workflow) {
            return res.status(404).json({
                success: false,
                message: "Workflow not found"
            });
        }

        return res.json({
            success: true,
            workflow
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error fetching workflow"
        });
    }
});



// update entire workflow
workflowRouter.put('/:id', authMiddleware, async (req, res) => {
    try {
        const workflowId = req.params.id;
        const userId = req.userId;
        const newWorkflowData = req.body; // full workflow object

        if (!workflowId || !userId) {
            return res.json({
                success: false,
                message: "Missing workflow or user id"
            });
        }

        const result = await workflowModel.replaceWorkflow(workflowId, userId, newWorkflowData);

        if (!result) {
            return res.json({
                success: false,
                message: "Failed updating workflow"
            });
        }

        return res.json({
            success: true,
            message: "Updated workflow successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating workflow"
        });
    }
});




workflowRouter.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const workflowId = req.params.id 
        const userId = req.userId;

        if (!workflowId) {
            return res.json({
                success: false,
                message: " no workflow id"
            })
        }
        if (!userId) {
            return res.json({
                success: false,
                message: " no user id"
            })
        }

        const result = await workflowModel.deleteWorkflow(workflowId, userId)

        if (result.deletedCount === 0) {
        return res.json({
                success: false,
                message: "Failed deleting workflow"
            });
        }


        return res.json({
            success: true,
            message: "delete workflow successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error deleting workflow"
        });
    }
})