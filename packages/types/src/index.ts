export interface TelegramNodeData {
    label: string
    credentials: string
    chatId: string
    message: string
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