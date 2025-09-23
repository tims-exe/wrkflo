import { Router } from "express";
import { WebhookModel } from "../models/webhookModel";
import { WorkflowModel } from "../models/workflowModel";
import { CredentialModel } from "../models/credentialModel";
import { WebhookNodeData, WorkflowData } from "types";
import { authMiddleware } from "./authMiddleware";
import { executeWorkflow } from "../lib/execute";

export const whRouter: Router = Router()
const webhookModel = new WebhookModel()

whRouter.get('/handler/:id', async (req, res) => {
    const { id } = req.params

    try {
        const wh = await webhookModel.getWebhook(id, "GET")
        
        if (!wh) {
            return res.json({
                success: false,
                message: 'Webhook not found'
            })
        }

        console.log(`Webhook ${id} triggered`)

        // Get the workflow using the workflowId from webhook
        const workflowModel = new WorkflowModel()
        const credentialModel = new CredentialModel()
        
        // Get workflow by workflowId from webhook data
        const workflow = await workflowModel.getWorkflow(wh.workflowId)
        
        if (!workflow) {
            return res.json({
                success: false,
                message: 'Workflow not found'
            })
        }

        console.log(`Executing workflow ${wh.workflowId} from webhook trigger`)

        // Execute the workflow
        const executionResult = await executeWorkflow(workflow, credentialModel)

        return res.json({
            success: true,
            message: 'Webhook triggered and workflow executed',
            webhook: wh,
            execution: executionResult
        })

    } catch (error) {
        console.log('error with webhook handler', error)
        return res.json({
            success: false,
            message: 'error with webhook handler',
        })
    }
})

whRouter.post("/new", authMiddleware, async (req, res) => {
  const webhookData: WebhookNodeData = req.body;
  try {
    const wh = await webhookModel.createWebhook(webhookData);

    return res.json({
      success: true,
      message: wh,
    });
  } catch (error) {
    console.log("error with webhook create", error);
    return res.status(500).json({
      success: false,
      message: "error with webhook create",
    });
  }
});