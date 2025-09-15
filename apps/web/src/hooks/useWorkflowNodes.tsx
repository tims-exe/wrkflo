import { useCallback } from "react";
import { Node } from "@xyflow/react";
import { NodeData } from "@/types/nodes";
import axios from "axios";

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

  const addNode = useCallback( async (
    type: string, 
    data: NodeData | { label: string; triggerType: string },
    position: { x: number; y: number } = { x: 300, y: 300 }
  ) => {
    const newNode: Node = {
      id: getNextNodeId(nodes),
      type,
      data,
      position,
    };

    setNodes((prev) => [...prev, newNode]);
    
    if (type === "webhook-trigger") {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/webhook/new`, data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
    }
  }, [nodes, setNodes, getNextNodeId]);

  return {
    addNode,
  };
};