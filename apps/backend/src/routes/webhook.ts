import { Router } from "express";
import { WebhookModel } from "../models/webhookModel";
import { WebhookNodeData } from "types";
import { authMiddleware } from "./authMiddleware";

export const whRouter: Router = Router()
const webhookModel = new WebhookModel()

whRouter.get('/handler/:id', async (req, res) => {
    const { id } = req.params

    try {
        const wh = await webhookModel.getWebhook(id, "GET")

        return res.json({
            success: true,
            message: wh
        })
    } catch (error) {
        console.log('error with webhook handler', error)
        return res.json({
            success: false,
            message: 'error with webhook handler'
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