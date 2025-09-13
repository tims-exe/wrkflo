export interface TelegramNodeData extends Record<string, unknown> {
  label: string;
  credentials: string;
  chatId: string;
  message: string;
  actionType?: "telegram";
}

export interface EmailNodeData extends Record<string, unknown> {
  label: string;
  credentials: string;
  body: string;
  actionType?: "email";
}

export interface WebhookNodeData extends Record<string, unknown> {
  label: "Webhook",
  triggerType: "webhook",
  url: string
}

export interface AiNodeData extends Record<string, unknown> {
  label: string,
  systemPrompt: string,
  actionType: 'agent-action'
}

export interface WorkflowData {
    userId: string
    name: string;
    enabled: boolean;
    nodes: NodeData[];
    connections: ConnectionData[];
    createdAt: Date;
    updatedAt: Date;
}

export interface NodeData {
    id: string;
    type: string;
    label: string;
    data: Record<string, any>;
    credentials?: string;
    position: { x: number; y: number };
    style?: Record<string, any>;
    selected: boolean;
    dragging: boolean;
}

export interface ConnectionData {
    source: string;
    target: string;
    outputIndex: number;
    inputIndex: number;
}


export interface CredentialTypes {
    userId: string
    app: string
    key: string
}