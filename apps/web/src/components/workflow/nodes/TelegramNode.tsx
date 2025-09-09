import { NodeProps } from "@xyflow/react";
import { TelegramNodeType } from "../../../types/nodes";

export default function TelegramNode({ data }: NodeProps<TelegramNodeType>) {
    return (
    <div className="bg-[#3b82f6] text-white p-3 rounded-xl shadow-md w-[200px]">
      <p className="font-bold">{data.label}</p>
      <div className="text-sm mt-2">
        <p><span className="font-semibold">API Key:</span> {data.credentials}</p>
        <p><span className="font-semibold">Chat ID:</span> {data.chatId}</p>
        <p><span className="font-semibold">Message:</span> {data.message}</p>
      </div>
    </div>
  )
}