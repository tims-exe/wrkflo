// types/nodes.ts
import { Node } from "@xyflow/react";
import { AiNodeData, EmailNodeData, ModelNodeData, TelegramNodeData, ToolNodeData, WebhookNodeData } from "types";

export type NodeData = TelegramNodeData | EmailNodeData | WebhookNodeData | AiNodeData | ModelNodeData | ToolNodeData;

export type TelegramNodeType = Node<TelegramNodeData, "telegram-action">;
export type EmailNodeType = Node<EmailNodeData, "email-action">;
export type WebhookNodeType = Node<WebhookNodeData, "webhook-trigger">;
export type ActionNodeType = Node<NodeData, "telegram-action" | "email-action">;
export type TriggerNodeType = Node<NodeData, "webhook-trigger">;
export type AiNodeType = Node<AiNodeData, "ai-action">
export type ModelNodeType = Node<ModelNodeData, "model-action">
export type ToolNodeType = Node<ToolNodeData, "tool-action">