import { Router } from "express";
import { UserController } from "../contollers/userController";
import { WorkflowController } from "../contollers/workflowController";
import { WorkflowData } from "types";
import { authMiddleware } from "./authMiddleware";


export const workflowRouter: Router = Router()
const userController = new UserController()
const workflowController = new WorkflowController()

workflowRouter.get('/', async (req, res) => {
    console.log('GET /api/v1/workflow/');
    
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        });
    }

    try {
        const workflows = await workflowController.getAllWorkflows(req.userId);

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
    const user = await userController.findByID(req.userId)

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
    const workflow = await workflowController.createWorkflow(currentWorkflow)

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
        const workflow = await workflowController.getWorkflow(req.userId, workflowId);

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



// update workflow nodes and edges
workflowRouter.put('/:id', authMiddleware, async (req, res) => {
    try {
        const workflowId = req.params.id;
        const { nodes, connections } = req.body;

        if (!workflowId) {
            return res.json({
                success: false,
                message:" no workflow id"
            })
        }

        const result = await workflowController.updateWorkflow(workflowId, { nodes, connections });

        if (!result) {
            return res.json({
                success: false,
                message: "failed updating workflow"
            });
        }

        return res.json({
            success: true,
            message: "updated workflow successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "error updating workflow"
        });
    }
});
