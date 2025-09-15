import { ModelNodeType, ToolNodeType } from "@/types/nodes";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ModelNodeData, ToolNodeData } from "types";
import ModelAction from "../actions/ModelAction";
import GetToolAction from "../actions/GetToolAction";
import Image from "next/image";

export default function AgentToolNode({
  data,
  id,
  selected,
}: NodeProps<ModelNodeType | ToolNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleDelete = () => {
    console.log("deleting node with id:", id);
    deleteElements({ nodes: [{ id }] });
  };

  const updateNode = (nodeData: ModelNodeData | ToolNodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...nodeData } } : node
      )
    );
  };

  const isModelNode = "model" in data || data.type === "model";

  const getBackgroundColor = () => {
    if (data.toolType === "gemini") return "bg-cyan-950";
    if (data.toolType === "get") return "border-2 border-neutral-400 bg-neutral-950";
    return "bg-neutral-700";
  };

  const getBorderClasses = () => {
    if (selected) {
      if (data.toolType === "gemini") return "border-2 border-cyan-800";
      if (data.toolType === "get") return "border-2 border-white";
      return "border-2 border-neutral-500";
    }
    if (data.toolType === "get") {
      return "border-2 border-neutral-400";
    }
    return "border-2 border-transparent";
  };

  return (
    <div className={`${getBackgroundColor()} ${getBorderClasses()} rounded-full text-white shadow-md w-[70px] relative transition-all duration-200`}>
      <Handle type="source" position={Position.Top} />

      <div className="p-3 flex flex-col justify-between items-center py-5">
        {isModelNode ? (
          <ModelAction
            name="Agent"
            handleNodeClick={updateNode}
            existingData={data as ModelNodeData}
          >
            <Image
              src={`/images/${data.toolType}.png`}
              alt=""
              width={30}
              height={30}
            />
          </ModelAction>
        ) : (
          <GetToolAction
            name="Agent"
            handleNodeClick={updateNode}
            existingData={data as ToolNodeData}
          >
            <p className="font-semibold text-neutral-400">GET</p>
          </GetToolAction>
        )}
      </div>

      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-colors z-10"
          title="Delete node"
        >
          ×
        </button>
      )}
    </div>
  );
}