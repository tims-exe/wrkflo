import { AiNodeType } from "@/types/nodes";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import AiAction from "../actions/AiAction";
import { AiNodeData } from "types";

export default function AiNode({ data, id, selected }: NodeProps<AiNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleDelete = () => {
    console.log("deleting node with id:", id);
    deleteElements({ nodes: [{ id }] });
  };

  const updateNode = (nodeData: AiNodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...nodeData } } : node
      )
    );
  };

  const getBorderClasses = () => {
    if (selected) {
      return "border-2 border-red-800";
    }
    return "border-2 border-transparent";
  };

  return (
    <div className={`bg-red-950 ${getBorderClasses()} rounded-2xl text-white shadow-md w-[200px] relative transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Left}
        id="chat-model"
        className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
        style={{ top: "50%" }}
      />

      <div className="p-3 flex justify-between items-center py-5">
        <AiAction
          name="Agent"
          handleNodeClick={updateNode}
          existingData={data as AiNodeData}
        >
          <div className="flex items-center gap-2 w-full h-full">
            <p className="font-bold text-sm flex items-center gap-2">
              <span className="text-xl">🤖</span> {data.label || "AI Agent"}
            </p>
          </div>
        </AiAction>
      </div>

      <div className="px-3 pb-3">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Model</span>
          <span className="mr-2">Tool</span>
        </div>
      </div>

      <Handle
        key={`model`}
        type="target"
        position={Position.Bottom}
        id={`model`}
        className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
        style={{
          left: `15%`,
          transform: "translateX(-50%)",
        }}
      />

      <Handle
        key={`tool`}
        type="target"
        position={Position.Bottom}
        id={`tool`}
        className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
        style={{
          left: `85%`,
          transform: "translateX(-50%)",
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
        style={{ top: "50%" }}
      />

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