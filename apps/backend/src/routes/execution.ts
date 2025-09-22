import { Router } from "express";
import { WorkflowModel } from "../models/workflowModel";


export const executeRouter: Router = Router()


executeRouter.post('/run', async (req, res) => {
    console.log('POST : /execute/run')
    const { workflowId } = req.body
    const userId = req.userId

    if (!userId) {
        return res.json({
            success: false,
            message: 'unautherized'
        })
    }

    const workflowModel = new WorkflowModel()

    console.log('executing : ', workflowId)

    const currentWorkflow = await workflowModel.getWorkflow(userId, workflowId)

    console.log('worfklow : ', currentWorkflow)
})