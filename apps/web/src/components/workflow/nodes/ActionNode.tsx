import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { TelegramNodeType } from "../../../types/nodes";

export default function ActionNode({ data, id }: NodeProps<TelegramNodeType>) {

    const { deleteElements } = useReactFlow();

    const handleDelete = () => {
      console.log('deleting node with id:', id);
      deleteElements({ nodes: [{ id }] });
    };

    const getBackgroundColor = () => {
      if (data.actionType === 'telegram') return 'bg-blue-900';
      if (data.actionType === 'email') return 'bg-green-900';
      return 'bg-neutral-700';
    };

    return (
    <div className={`${getBackgroundColor()} rounded-2xl text-white p-3 shadow-md w-[200px] flex justify-between items-center`}>
      <Handle type="target" position={Position.Left} id="target-left"/>      
      <p className="font-bold">{data.label}</p>
      <button 
        onClick={handleDelete}
        className="hover:cursor-pointer rounded transition-colors text-red-400"
      >
        X
      </button>
      
      <Handle type="source" position={Position.Right} id="target-right"/>
    </div>
  )
}