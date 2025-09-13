/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import TelegramNode from "./nodes/ActionNode";
import TriggerNode from "./nodes/TriggerNode";
import TelegramAction from "./actions/TelegramAction";
import axios from "axios";
import { WorkflowResponseData } from "@/types/workflow";
import EmailAction from "./actions/EmailAction";
import {
  AiNodeData,
  EmailNodeData,
  ModelNodeData,
  TelegramNodeData,
  ToolNodeData,
  WebhookNodeData,
} from "types";
import WebhookAction from "./actions/WebhookAction";
import AiAction from "./actions/AiAction";
import AiNode from "./nodes/AiNode";
import ModelAction from "./actions/ModelAction";
import GetToolAction from "./actions/GetToolAction";
import AgentToolNode from "./nodes/AgentToolNode";

const nodeTypes = {
  "telegram-action": TelegramNode,
  "email-action": TelegramNode,
  "manual-trigger": TriggerNode,
  "webhook-trigger": TriggerNode,
  "agent-action": AiNode,
  "model-tool": AgentToolNode,
  "get-tool": AgentToolNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

type SidebarView = "main" | "triggers" | "actions" | "tools";

export default function WorkflowComponent({
  workflowId,
}: {
  workflowId: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [worflow, setWorkflow] = useState<WorkflowResponseData>();
  const [loading, setLoading] = useState(true);
  const [sidebarView, setSidebarView] = useState<SidebarView>("main");

  useEffect(() => {
    const fetchCurrentWorkflow = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${workflowId}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        const wf = res.data.workflow;
        setWorkflow(wf);
        setNodes(wf.nodes);
        setEdges(wf.connections);
        setLoading(false);
        console.log(wf.nodes.length);
      }
    };

    fetchCurrentWorkflow();
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => addEdge(connection, prevEdges));
  }, []);

  const onNodesDelete = useCallback((deletedNodes: Node[]) => {
    console.log("deleted nodes:", deletedNodes);
  }, []);

  const onEdgesDelete = useCallback((deletedEdges: Edge[]) => {
    console.log("deleted edges:", deletedEdges);
  }, []);

  function addManualTriggerNode(): void {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "manual-trigger",
      data: {
        label: "Manual Trigger",
        triggerType: "manual",
      },
      position: { x: 50, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addWebhookTriggerNode(nodeData: WebhookNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "webhook-trigger",
      data: nodeData,
      position: { x: 50, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addTelegramNode(nodeData: TelegramNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "telegram-action",
      data: nodeData,
      position: { x: 300, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addEmailNode(nodeData: EmailNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "email-action",
      data: nodeData,
      position: { x: 300, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addAgentNode(nodeData: AiNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "agent-action",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addModelNode(nodeData: ModelNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "model-tool",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  function addGetTool(nodeData: ToolNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "get-tool",
      data: nodeData,
      position: {
        x: 300,
        y: 300,
      },
    };

    setNodes((prev) => [...prev, newNode]);
  }

  async function saveWorkflow() {
    const workflow = {
      nodes: nodes,
      connections: edges,
    };
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${workflowId}`,
      workflow,
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("response : ", res.data);
  }

  const renderSidebarContent = () => {
    switch (sidebarView) {
      case "main":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 text-center">Nodes</h3>
            <button
              onClick={() => setSidebarView("triggers")}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:bg-neutral-600 transition-colors text-start"
            >
              Triggers
            </button>
            <button
              onClick={() => setSidebarView("actions")}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:bg-neutral-600 transition-colors text-start"
            >
              Actions
            </button>
            <button
              onClick={() => setSidebarView("tools")}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:bg-neutral-600 transition-colors text-start"
            >
              Tools
            </button>
          </div>
        );

      case "triggers":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSidebarView("main")}
                className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                ✕
              </button>
              <h3 className="text-lg font-medium">Triggers</h3>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>
            <button
              onClick={addManualTriggerNode}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:bg-neutral-600 transition-colors text-start"
            >
              Manual
            </button>
            <WebhookAction
              name="Webhook"
              handleNodeClick={addWebhookTriggerNode}
            />
          </div>
        );

      case "actions":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSidebarView("main")}
                className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                ✕
              </button>
              <h3 className="text-lg font-medium">Actions</h3>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>
            <TelegramAction name="Telegram" handleNodeClick={addTelegramNode} />
            <EmailAction name="Email" handleNodeClick={addEmailNode} />
            <AiAction name="Agent" handleNodeClick={addAgentNode} />
          </div>
        );

      case "tools":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSidebarView("main")}
                className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
              >
                ✕
              </button>
              <h3 className="text-lg font-medium">Tools</h3>
              <div className="w-10"></div> {/* Spacer for centering */}
            </div>
            <ModelAction name="Model" handleNodeClick={addModelNode} />
            <GetToolAction name="Tool" handleNodeClick={addGetTool} />
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-5">workflow {worflow?.name}</p>
      <div className="flex w-full gap-10">
        <div className="w-full h-[600px] border-2 border-neutral-500 rounded-2xl">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
            deleteKeyCode="Delete"
            multiSelectionKeyCode="Shift"
            fitView
          >
            <Background />
          </ReactFlow>
        </div>

        {/* Fixed Sidebar */}
        <div className="w-[300px] flex flex-col gap-5 h-[600px]">
          <div className="flex-1 bg-transparent border-2 rounded-2xl border-neutral-500 px-5 py-5 overflow-hidden">
            {renderSidebarContent()}
          </div>

          <button
            onClick={saveWorkflow}
            className="h-1/9 border-2 rounded-2xl border-neutral-500 py-3 hover:cursor-pointer hover:bg-neutral-800 duration-200 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
