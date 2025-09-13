import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ActionNodeType } from "../../../types/nodes";
import EmailAction from "../actions/EmailAction";
import TelegramAction from "../actions/TelegramAction";
import { EmailNodeData, TelegramNodeData } from "types";

export default function ActionNode({ data, id }: NodeProps<ActionNodeType>) {
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
    if (data.actionType === "telegram") return "bg-blue-900";
    if (data.actionType === "email") return "bg-green-900";
    return "bg-neutral-700";
  };

  return (
    <div
      className={`${getBackgroundColor()} rounded-2xl text-white p-3 shadow-md w-[200px] flex justify-between items-center py-5`}
    >
      <Handle type="target" position={Position.Left} id="target-left" />
      <p className="font-bold">{data.label}</p>

      {data.actionType === "email" ? (
        <EmailAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data}
        >
          <button className="hover:cursor-pointer rounded transition-colors">
            =
          </button>
        </EmailAction>
      ) : data.actionType === "telegram" ? (
        <TelegramAction
          name={data.label}
          handleNodeClick={updateNode}
          existingData={data}
        >
          <button className="hover:cursor-pointer rounded transition-colors">
            =
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

      <Handle type="source" position={Position.Right} id="target-right" />
    </div>
  );
}
