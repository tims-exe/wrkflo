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
// import TriggerButton from "../ui/TriggerButton";
import TelegramNode from "./nodes/TelegramNode";
import TelegramAction from "../ui/TelegramAction";
import { NodeData } from "@/types/nodes";
import axios from "axios";
import { WorkflowResponseData } from "@/types/workflow";

const nodeTypes = {
  "telegram-action": TelegramNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let nodeId = initialNodes.length + 1;

export default function WorkflowComponent({
  workflowId,
}: {
  workflowId: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [worflow, setWorkflow] = useState<WorkflowResponseData>();
  const [loading, setLoading] = useState(true)

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
        const wf = res.data.workflow
        setWorkflow(wf);
        setNodes(wf.nodes)
        setEdges(wf.connections)
        setLoading(false)
      }
    };

    fetchCurrentWorkflow();
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((prevEdges) => addEdge(connection, prevEdges));
  }, []);

  function addNewNode<T extends NodeData & Record<string, unknown>>(
    nodeType: string,
    data: T
  ): void {
    const newNode: Node = {
      id: `${nodeId++}`,
      type: nodeType,
      data: data,
      position: { x: 300, y: 300 },
      style: {
        backgroundColor: "#525252",
        color: "white",
        borderRadius: "1rem",
      },
    };

    setNodes((prev) => [...prev, newNode]);
    console.log(nodes);
    console.log(edges);
  }

  async function saveWorkflow() {
    const workflow = {
      nodes: nodes,
      connections: edges
    }
    const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${workflowId}`, workflow, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })
    console.log('response : ', res.data)
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
            proOptions={{ hideAttribution: true }}
            nodeTypes={nodeTypes}
          >
            <Background />
          </ReactFlow>
        </div>
        <div className="w-[300px] flex flex-col gap-5">
          <div className="w-full h-full bg-transparent border-2 rounded-2xl border-neutral-500 px-5 py-5">
            <p>Triggers</p>
            <div className="w-full bg-neutral-600 h-0.5 my-3"></div>
            {/* <TriggerButton name="Manual" handleTriggerClick={addNewNode} /> */}
            {/* <TriggerButton name="Webhook" handleTriggerClick={addNewNode} /> */}
            <p>Actions</p>
            <div className="w-full bg-neutral-600 h-0.5 my-3"></div>
            <TelegramAction name="Telegram" handleNodeClick={addNewNode} />
            {/* <TriggerButton name="Email" handleTriggerClick={addNewNode} /> */}
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
