// types/nodes.ts
import { Node } from "@xyflow/react";
import { EmailNodeData, TelegramNodeData, WebhookNodeData } from "types";

export type NodeData = TelegramNodeData | EmailNodeData | WebhookNodeData;

export type TelegramNodeType = Node<TelegramNodeData, "telegram-action">;
export type EmailNodeType = Node<EmailNodeData, "email-action">;
export type WebhookNodeType = Node<WebhookNodeData, "webhook-trigger">;
export type ActionNodeType = Node<NodeData, "telegram-action" | "email-action">;
export type TriggerNodeType = Node<NodeData, "webhook-trigger">;
