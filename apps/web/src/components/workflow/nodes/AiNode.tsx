import { AiNodeType } from "@/types/nodes";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import AiAction from "../actions/AiAction";
import { AiNodeData } from "types";

export default function AiNode({ data, id }: NodeProps<AiNodeType>) {
    const { setNodes } = useReactFlow();
    
    const updateNode = (nodeData: AiNodeData) => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...nodeData } }
              : node
          )
        );
    };

    return (
        <div className="bg-neutral-700 rounded-2xl text-white shadow-md w-[200px] relative">
            <Handle 
                type="target" 
                position={Position.Left} 
                id="chat-model"
                className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
                style={{ top: '50%' }}
            />
            
            <div className="p-3 flex justify-between items-center py-5">
                <div className="flex items-center gap-2">
                    {/* <div className="text-lg"></div> */}
                    <p className="font-bold text-sm">
                        {data.label || "AI Agent"}
                    </p>
                </div>

                <AiAction name="Agent" handleNodeClick={updateNode} existingData={data as AiNodeData}>
                    <button className="hover:cursor-pointer rounded transition-colors text-gray-300 hover:text-white">
                        =
                    </button>
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
                    transform: 'translateX(-50%)'
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
                    transform: 'translateX(-50%)'
                }}
            />

            <Handle 
                type="source" 
                position={Position.Right} 
                id="output"
                className="!bg-gray-300 !border-2 !border-gray-400 !w-3 !h-3"
                style={{ top: '50%' }}
            />
        </div>
    )
}