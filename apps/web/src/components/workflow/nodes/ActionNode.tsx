import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ActionNodeType } from "../../../types/nodes";
import EmailAction from "../actions/EmailAction";
import TelegramAction from "../actions/TelegramAction";
import { EmailNodeData, TelegramNodeData } from "types";
import Image from "next/image";

export default function ActionNode({ data, id, selected }: NodeProps<ActionNodeType>) {
  const { setNodes, deleteElements } = useReactFlow();

  const handleDelete = () => {
    console.log("deleting node with id:", id);
    deleteElements({ nodes: [{ id }] });
  };

  const updateNode = (nodeData: TelegramNodeData | EmailNodeData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...nodeData,
              },
            }
          : node
      )
    );
  };

  const getBackgroundColor = () => {
    if (data.actionType === "telegram") return "bg-blue-950";
    if (data.actionType === "email") return "bg-green-950";
    return "bg-neutral-700";
  };

  const getBorderClasses = () => {
    if (selected) {
      if (data.actionType === "telegram") return "border-2 border-blue-800";
      if (data.actionType === "email") return "border-2 border-green-800";
      return "border-2 border-neutral-500";
    }
    return "border-2 border-transparent";
  };

  return (
    <div
      className={`${getBackgroundColor()} ${getBorderClasses()} rounded-2xl text-white p-3 shadow-md w-[100px] flex justify-center items-center py-5 transition-all duration-200 relative`}
    >
      <Handle type="target" position={Position.Left} id="target-left" />

      {data.actionType === "email" ? (
        <EmailAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data}
        >
          <button className="hover:cursor-pointer rounded transition-colors">
            <Image
              src={`/images/${data.actionType}.png`}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </EmailAction>
      ) : data.actionType === "telegram" ? (
        <TelegramAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data}
        >
          <button className="hover:cursor-pointer rounded transition-colors">
            <Image
              src={`/images/${data.actionType}.png`}
              alt=""
              width={30}
              height={30}
            />
          </button>
        </TelegramAction>
      ) : (
        <button
          onClick={handleDelete}
          className="hover:cursor-pointer rounded transition-colors"
        >
          x
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

      <Handle type="source" position={Position.Right} id="target-right" />
    </div>
  );
}