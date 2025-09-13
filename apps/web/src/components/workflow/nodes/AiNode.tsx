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
        <div className="bg-neutral-700 rounded-2xl text-white p-3 shadow-md w-[200px] flex justify-between items-center py-5">
            <Handle type="target" position={Position.Left} id="source-left"/>

            <p className="font-bold">
                {data.label}
            </p>

            <AiAction name="Agent" handleNodeClick={updateNode} existingData={data as AiNodeData}>
                <button className="hover:cursor-pointer rounded transition-colors">=</button>
            </AiAction>
            <Handle type="source" position={Position.Right} id="target-right" />
        </div>
    )
}