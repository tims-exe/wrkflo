import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { TelegramNodeType } from "../../../types/nodes";

export default function TriggerNode({ data, id }: NodeProps<TelegramNodeType>) {

    const { deleteElements } = useReactFlow();

    const handleDelete = () => {
      console.log('deleting node with id:', id);
      deleteElements({ nodes: [{ id }] });
    };

    const getBackgroundColor = () => {
      if (data.triggerType === 'manual') return 'bg-red-900';
      if (data.triggerType === 'webhook') return 'bg-purple-900';
      return 'bg-neutral-700';
    };

    return (
    <div className={`${getBackgroundColor()} rounded-2xl text-white p-3 shadow-md w-[200px] flex flex-col`}>
      <div className="flex justify-between items-center">
        <p className="font-bold">{data.label}</p>
        <button 
          onClick={handleDelete}
          className="hover:cursor-pointer rounded transition-colors text-red-400"
        >
          X
        </button>
      </div>
      <Handle type="source" position={Position.Right} id="source-right"/>
    </div>
  )
}