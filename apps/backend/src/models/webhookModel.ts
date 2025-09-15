import { WebhookNodeData } from "types";
import { AppDataSource } from "../config/data-source";
import { Webhook } from "../entities/Webhook";

export class WebhookModel {
  private whRepo = AppDataSource.getMongoRepository(Webhook);

  async getWebhook(webhookId: string, method: string) {
    return await this.whRepo.findOne({
      where: { webhookId, method },
    });
  }

  async createWebhook(webhookData: WebhookNodeData) {
    const webhookId = webhookData.url.split("/").pop();
    if (!webhookId) return

    const webhook = this.whRepo.create({
      webhookId,
      workflowId: webhookData.workflowId,
      method: webhookData.type || "GET",
    } as Webhook);

    return await this.whRepo.save(webhook);
  }
}
