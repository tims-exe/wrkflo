import { useCallback } from "react";
import { Node } from "@xyflow/react";
import {
  AiNodeData,
  EmailNodeData,
  ModelNodeData,
  TelegramNodeData,
  ToolNodeData,
  WebhookNodeData,
} from "types";

interface UseWorkflowNodesProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export const useWorkflowNodes = ({ nodes, setNodes }: UseWorkflowNodesProps) => {
  const getNextNodeId = useCallback((nodes: Node[]) => {
    const existingIds = nodes
      .map((node) => parseInt(node.id))
      .filter((id) => !isNaN(id));
    let nextId = 1;
    while (existingIds.includes(nextId)) {
      nextId++;
    }
    return nextId.toString();
  }, []);

  const addManualTriggerNode = useCallback((): void => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "manual-trigger",
      data: {
        label: "Manual Trigger",
        triggerType: "manual",
      },
      position: { x: 50, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addWebhookTriggerNode = useCallback((nodeData: WebhookNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "webhook-trigger",
      data: nodeData,
      position: { x: 50, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addTelegramNode = useCallback((nodeData: TelegramNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "telegram-action",
      data: nodeData,
      position: { x: 300, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addEmailNode = useCallback((nodeData: EmailNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "email-action",
      data: nodeData,
      position: { x: 300, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addAgentNode = useCallback((nodeData: AiNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "agent-action",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addModelNode = useCallback((nodeData: ModelNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "model-tool",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  const addGetTool = useCallback((nodeData: ToolNodeData) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type: "get-tool",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }, [nodes, setNodes, getNextNodeId]);

  return {
    addManualTriggerNode,
    addWebhookTriggerNode,
    addTelegramNode,
    addEmailNode,
    addAgentNode,
    addModelNode,
    addGetTool,
  };
};