import { Node } from "@xyflow/react";
import { TelegramNodeData } from "types";

export type TelegramNodeType = Node<TelegramNodeData & Record<string, unknown>, 'telegram-action'>;

export type NodeData = TelegramNodeData //| EmailNodeData | ManualTriggerData | WebhookTriggerData;
