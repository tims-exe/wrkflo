import { Router } from "express";
import { WorkflowModel } from "../models/workflowModel";
import { CredentialModel } from "../models/credentialModel";
import { executeWorkflow } from "../lib/execute";
// import nodemailer from 'nodemailer';
// import axios from 'axios';

export const executeRouter: Router = Router()

executeRouter.post('/run', async (req, res) => {
    console.log('POST : /execute/run')
    const { workflowId } = req.body
    const userId = req.userId

    if (!userId) {
        return res.json({
            success: false,
            message: 'unauthorized'
        })
    }

    const workflowModel = new WorkflowModel()
    const credentialModel = new CredentialModel()

    // console.log('executing : ', workflowId)

    try {
        const currentWorkflow = await workflowModel.getWorkflow(workflowId)
        console.log('workflow : ', currentWorkflow)

        if (!currentWorkflow) {
            return res.json({
                success: false,
                message: 'Workflow not found'
            })
        }

        console.log('curr workflow : ', currentWorkflow)
        // Execute the workflow
        const result = await executeWorkflow(currentWorkflow, credentialModel)
        
        res.json(result)
    } catch (error) {
        console.error('Execution error:', error)
        res.json({
            success: false,
            message: 'Execution failed',
        })
    }
})