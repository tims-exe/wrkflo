import { ModelNodeType, ToolNodeType } from "@/types/nodes";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ModelNodeData, ToolNodeData } from "types";
import ModelAction from "../actions/ModelAction";
import GetToolAction from "../actions/GetToolAction";

export default function AgentToolNode({ data, id }: NodeProps<ModelNodeType | ToolNodeType>) {
    const { setNodes } = useReactFlow();
    
    const updateNode = (nodeData: ModelNodeData | ToolNodeData) => {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...nodeData } }
              : node
          )
        );
    };

    const isModelNode = 'model' in data || data.type === 'model';

    return (
        <div className="bg-neutral-700 rounded-full text-white shadow-md w-[80px] relative">
            <Handle 
                type="source" 
                position={Position.Top} 
            />
            
            <div className="p-3 flex flex-col justify-between items-center pt-5 pb-3">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">
                        {data.label}
                    </p>
                </div>

                {isModelNode ? (
                    <ModelAction name="Agent" handleNodeClick={updateNode} existingData={data as ModelNodeData}>
                        <button className="hover:cursor-pointer rounded-full transition-colors text-gray-300 hover:text-white text-center">
                            =
                        </button>
                    </ModelAction>
                ) : (
                    <GetToolAction name="Agent" handleNodeClick={updateNode} existingData={data as ToolNodeData}>
                        <button className="hover:cursor-pointer rounded-full transition-colors text-gray-300 hover:text-white">
                            =
                        </button>
                    </GetToolAction>
                )}
            </div>
        </div>
    )
}