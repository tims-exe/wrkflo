export interface ExecutionResult {
    nodeId: string;
    type: string;
    success: boolean;
    result?: unknown;
    error?: string;
}