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
import { EmailNodeData, TelegramNodeData, WebhookNodeData } from "types";
import WebhookAction from "./actions/WebhookAction";

const nodeTypes = {
  "telegram-action": TelegramNode,
  "email-action": TelegramNode,
  "manual-trigger": TriggerNode,
  "webhook-trigger": TriggerNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function WorkflowComponent({
  workflowId,
}: {
  workflowId: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [worflow, setWorkflow] = useState<WorkflowResponseData>();
  const [loading, setLoading] = useState(true);

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
    console.log(nodes);
    console.log(edges);
  }

  function addEmailNode(nodeData: EmailNodeData) {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: "email-action",
      data: nodeData,
      position: { x: 300, y: 300 },
    };

    setNodes((prev) => [...prev, newNode]);
    console.log(nodes);
    console.log(edges);
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
        <div className="w-[300px] flex flex-col gap-5">
          <div className="w-full h-full bg-transparent border-2 rounded-2xl border-neutral-500 px-5 py-5">
            <p>Triggers</p>
            <div className="w-full bg-neutral-600 h-0.5 my-3"></div>
            <button
              onClick={addManualTriggerNode}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5"
            >
              Manual
            </button>
            {/* <button
              onClick={addWebhookTriggerNode}
              className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5"
            >
              Webhook
            </button> */}
            <WebhookAction name="Webhook" handleNodeClick={addWebhookTriggerNode} />
            <p>Actions</p>
            <div className="w-full bg-neutral-600 h-0.5 my-3"></div>
            <TelegramAction name="Telegram" handleNodeClick={addTelegramNode} />
            <EmailAction name="Email" handleNodeClick={addEmailNode} />
          </div>
          <button
            onClick={saveWorkflow}
            className="border-2 rounded-2xl border-neutral-500 py-3 hover:cursor-pointer hover:bg-neutral-800 duration-200 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
