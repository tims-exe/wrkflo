import { Handle, NodeProps, Position } from "@xyflow/react";
import { TelegramNodeType } from "../../../types/nodes";

export default function TelegramNode({ data }: NodeProps<TelegramNodeType>) {
    return (
    <div className="bg-neutral-700 rounded-2xl text-white p-3 shadow-md w-[200px]">
      <Handle type="target" position={Position.Left} id="target-left"/>
      {/* <Handle type="source" position={Position.Left} id="source-left" style={{ bottom: '75%' }}/> */}
      
      <p className="font-bold">{data.label}</p>
      <div className="text-sm mt-2">
        <p><span className="font-semibold">API Key:</span> {data.credentials}</p>
        <p><span className="font-semibold">Chat ID:</span> {data.chatId}</p>
        <p><span className="font-semibold">Message:</span> {data.message}</p>
      </div>
      
      <Handle type="source" position={Position.Right} id="target-right"/>
      {/* <Handle type="source" position={Position.Right} id="source-right" style={{ bottom: '75%' }}/> */}
    </div>
  )
}