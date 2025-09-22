import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { TriggerNodeType } from "../../../types/nodes";
import { WebhookNodeData } from "types";
import WebhookAction from "../actions/WebhookAction";
import Image from "next/image";
import axios from "axios";

export default function TriggerNode({ data, id, selected }: NodeProps<TriggerNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleDelete = () => {
    console.log("deleting node with id:", id);
    deleteElements({ nodes: [{ id }] });
  };

  const updateNode = (nodeData: WebhookNodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...nodeData } } : node
      )
    );
  };

  const getBackgroundColor = () => {
    if (data.triggerType === "manual") return "bg-amber-950";
    if (data.triggerType === "webhook") return "bg-purple-950";
    return "bg-neutral-700";
  };

  const getBorderClasses = () => {
    if (selected) {
      if (data.triggerType === "manual") return "border-2 border-amber-800";
      if (data.triggerType === "webhook") return "border-2 border-purple-800";
      return "border-2 border-neutral-500";
    }
    return "border-2 border-transparent";
  };

  const handleManualTrigger = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/execute/run`, {
        workflowId: data.workflowId
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`${getBackgroundColor()} ${getBorderClasses()} rounded-2xl text-white p-3 shadow-md w-[100px] flex justify-center items-center py-5 transition-all duration-200 relative`}
    >
      <Handle type="source" position={Position.Right} id="source-right" />

      {data.triggerType === "webhook" && (
        <WebhookAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data as WebhookNodeData}
        >
          <button className="hover:cursor-pointer rounded transition-colors">
            <Image
              src={`/images/${data.triggerType}.png`}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </WebhookAction>
      )}

      {data.triggerType === "manual" && (
        <button
          onClick={handleManualTrigger}
          className="hover:cursor-pointer rounded transition-colors text-red-400 pr-2 pb-1"
        >
          <Image
            src={`/images/${data.triggerType}.png`}
            alt=""
            width={35}
            height={35}
          />
        </button>
      )}

      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold transition-colors z-10"
          title="Delete node"
        >
          ×
        </button>
      )}
    </div>
  );
}