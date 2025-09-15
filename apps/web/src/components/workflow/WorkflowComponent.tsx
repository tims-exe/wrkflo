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
import WebhookAction from "./actions/WebhookAction";
import AiAction from "./actions/AiAction";
import AiNode from "./nodes/AiNode";
import ModelAction from "./actions/ModelAction";
import GetToolAction from "./actions/GetToolAction";
import AgentToolNode from "./nodes/AgentToolNode";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { useWorkflowNodes } from "@/hooks/useWorkflowNodes";
import Navbar from "../main/Navbar";

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

export default function WorkflowComponent({
  workflowId,
}: {
  workflowId: string;
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [worflow, setWorkflow] = useState<WorkflowResponseData>();
  const [loading, setLoading] = useState(true);

  const { addNode } = useWorkflowNodes({ nodes, setNodes });

  const addManualTriggerNode = useCallback(() => {
    addNode("manual-trigger", {
      label: "Manual Trigger",
      triggerType: "manual",
    }, { x: 50, y: 300 });
  }, [addNode]);

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
      <Navbar title={`Worflow ${worflow?.name}`}/>
      <div className="px-10">
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
        <div className="w-[300px] flex flex-col gap-5 h-[600px]">
          <div className="flex-1 bg-transparent border-2 rounded-2xl border-neutral-500 px-5 py-5 overflow-hidden">
            <Tabs defaultValue="triggers" className="w-full h-full">
              <TabsList className="grid w-full grid-cols-3 bg-transparent rounded-[10px] border-2 border-neutral-700 py-2 px-2 h-max">
                <TabsTrigger 
                  value="triggers" 
                  className="data-[state=active]:bg-neutral-800 rounded-[6px]"
                >
                  <Image
                    src="/images/triggers-icon.png"
                    alt="Triggers"
                    width={20}
                    height={20}
                  />
                </TabsTrigger>
                <TabsTrigger 
                  value="actions"
                  className="data-[state=active]:bg-neutral-800 rounded-[10px]"
                >
                  <Image
                    src="/images/actions-icon.png"
                    alt="Actions"
                    width={20}
                    height={20}
                  />
                </TabsTrigger>
                <TabsTrigger 
                  value="tools"
                  className="data-[state=active]:bg-neutral-800 rounded-[10px]"
                >
                  <Image
                    src="/images/tools-icon.png"
                    alt="Tools"
                    width={20}
                    height={20}
                  />
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="triggers" className="space-y-4 mt-6 text-sm">
                <button
                  onClick={addManualTriggerNode}
                  className="bg-neutral-900 border-2 border-neutral-600 hover:bg-neutral-800 w-full px-4 py-4 rounded-2xl transition-colors text-start"
                >
                  <p>
                    Manual Trigger
                  </p>
                </button>
                <WebhookAction
                  name="Webhook Trigger"
                  handleNodeClick={(data) => addNode("webhook-trigger", data)}
                  w_id={workflowId}
                />
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-4 mt-6 text-sm">
                <TelegramAction 
                  name="Telegram" 
                  handleNodeClick={(data) => addNode("telegram-action", data)} 
                />
                <EmailAction 
                  name="Email" 
                  handleNodeClick={(data) => addNode("email-action", data)} 
                />
                <AiAction 
                  name="AI Agent" 
                  handleNodeClick={(data) => addNode("agent-action", data)} 
                />
              </TabsContent>
              
              <TabsContent value="tools" className="space-y-4 mt-6 text-sm">
                <ModelAction 
                  name="Model" 
                  handleNodeClick={(data) => addNode("model-tool", data)} 
                />
                <GetToolAction 
                  name="Tool" 
                  handleNodeClick={(data) => addNode("get-tool", data)} 
                />
              </TabsContent>
            </Tabs>
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
    </div>
  );
}