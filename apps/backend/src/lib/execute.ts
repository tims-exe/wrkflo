import { ConnectionData, NodeData, WorkflowData } from "types"
import { CredentialModel } from "../models/credentialModel"
import { ExecutionResult } from "../types/main"

export async function executeWorkflow(workflow: WorkflowData, credentialModel: CredentialModel) {
    console.log('Starting workflow execution...')
    
    const triggerNode = workflow.nodes.find((node: NodeData) => 
        node.type === 'manual-trigger' || node.type === 'webhook-trigger'
    )
    
    if (!triggerNode) {
        throw new Error('No trigger node found')
    }

    console.log('Found trigger node:', triggerNode.id, 'type:', triggerNode.type)

    const executionResults: ExecutionResult[] = []
    const executedNodes = new Set<string>()
    
    // Start execution from trigger node
    await executeNodeAndSuccessors(
        triggerNode.id, 
        workflow.connections, 
        workflow.nodes, 
        credentialModel, 
        executionResults, 
        executedNodes
    )

    const allSuccessful = executionResults.every(result => result.success)
    
    return {
        success: allSuccessful,
        message: allSuccessful ? 'Workflow executed successfully' : 'Some actions failed',
        results: executionResults,
        triggerType: triggerNode.type
    }
}

async function executeNodeAndSuccessors(
    nodeId: string,
    connections: ConnectionData[],
    allNodes: NodeData[],
    credentialModel: CredentialModel,
    executionResults: ExecutionResult[],
    executedNodes: Set<string>
): Promise<void> {
    if (executedNodes.has(nodeId)) {
        return
    }

    const node = allNodes.find(n => n.id === nodeId)
    if (!node) {
        console.warn(`Node ${nodeId} not found`)
        return
    }

    executedNodes.add(nodeId)

    if (node.type !== 'manual-trigger' && node.type !== 'webhook-trigger') {
        console.log(`Executing node ${node.id} of type ${node.type}`)
        
        try {
            const result = await executeNode(node, credentialModel)
            executionResults.push({
                nodeId: node.id,
                type: node.type,
                success: true,
                result: result
            })
        } catch (error) {
            console.error(`Error executing node ${node.id}:`, error)
            executionResults.push({
                nodeId: node.id,
                type: node.type,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            })
        }
    }

    const successorNodeIds = connections
        .filter(conn => conn.source === nodeId)
        .map(conn => conn.target)

    const successorPromises = successorNodeIds.map(successorId => 
        executeNodeAndSuccessors(
            successorId, 
            connections, 
            allNodes, 
            credentialModel, 
            executionResults, 
            executedNodes
        )
    )

    await Promise.all(successorPromises)
}

async function executeNode(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    switch (node.type) {
        case 'email-action':
            return await executeEmailAction(node, credentialModel)
        case 'telegram-action':
            return await executeTelegramAction(node, credentialModel)
        case 'ai-action':
            return await executeAiAction(node, credentialModel)
        case 'model-action':
            return await executeModelAction(node, credentialModel)
        case 'tool-action':
            return await executeToolAction(node, credentialModel)
        default:
            throw new Error(`Unknown node type: ${node.type}`)
    }
}

async function executeEmailAction(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    console.log('Executing email action:', node.data)
    
    // Email execution logic will be implemented here
    
    console.log('Email sent')
    return {
        message: 'Email sent successfully'
    }
}

async function executeTelegramAction(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    console.log('Executing telegram action:', node.data)
    
    // Telegram execution logic will be implemented here

    console.log('Telegram message sent')
    return {
        message: 'Telegram message sent successfully'
    }
}

async function executeAiAction(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    console.log('Executing AI action:', node.data)
    
    // AI execution logic will be implemented here
    
    console.log('AI action completed')
    return {
        message: 'AI action completed successfully'
    }
}

async function executeModelAction(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    console.log('Executing model action:', node.data)
    
    // Model execution logic will be implemented here
    
    console.log('Model action completed')
    return {
        message: 'Model action completed successfully'
    }
}

async function executeToolAction(node: NodeData, credentialModel: CredentialModel): Promise<unknown> {
    console.log('Executing tool action:', node.data)
    
    // Tool execution logic will be implemented here
    
    console.log('Tool action completed')
    return {
        message: 'Tool action completed successfully'
    }
}