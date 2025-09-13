import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { TriggerNodeType } from "../../../types/nodes";
import { WebhookNodeData } from "types";
import WebhookAction from "../actions/WebhookAction";

export default function TriggerNode({ data, id }: NodeProps<TriggerNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleDelete = () => {
    console.log("deleting node with id:", id);
    deleteElements({ nodes: [{ id }] });
  };

  const updateNode = (nodeData: WebhookNodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...nodeData } }
          : node
      )
    );
  };

  const getBackgroundColor = () => {
    if (data.triggerType === "manual") return "bg-red-900";
    if (data.triggerType === "webhook") return "bg-purple-900";
    return "bg-neutral-700";
  };

  return (
    <div
      className={`${getBackgroundColor()} rounded-2xl text-white p-3 shadow-md w-[200px] flex justify-between items-center py-5`}
    >
      <Handle type="source" position={Position.Right} id="source-right" />

      <p className="font-bold">{data.label}</p>

      {/* Only show WebhookAction for webhook triggers */}
      {data.triggerType === "webhook" && (
        <WebhookAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data as WebhookNodeData}
        >
          <button className="hover:cursor-pointer rounded transition-colors">=</button>
        </WebhookAction>
      )}

      {/* Show delete only for manual triggers */}
      {data.triggerType === "manual" && (
        <button
          onClick={handleDelete}
          className="hover:cursor-pointer rounded transition-colors text-red-400"
        >
          X
        </button>
      )}
    </div>
  );
}
