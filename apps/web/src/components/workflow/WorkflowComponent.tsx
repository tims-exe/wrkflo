"use client"

import { addEdge, Background, Connection, Controls, Edge, Node, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css"
import { useCallback } from "react";

const initialNodes:Node[] = [{
    id: "1",
    data: {
        label: 'Node 1'
    },
    position: {x:0, y:0},
    style: { backgroundColor: '#525252', color: 'white', borderRadius: '1rem' }
},{
    id: "2",
    data: {
        label: 'Node 2'
    },
    position: {x:200, y:200},
    style: { backgroundColor: '#525252', color: 'white', borderRadius: '1rem' }
},{
    id: "3",
    data: {
        label: 'Node 3'
    },
    position: {x:200, y:300},
    style: { backgroundColor: '#525252', color: 'white', borderRadius: '1rem' }
}]

const initialEdges: Edge[] = [
    {id: '1-2', source: "1", target: "2", sourceHandle: null, targetHandle: null}
]


export default function WorkflowComponent() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    // const onConnect = useCallback((connection: Connection) => {
    //     const edge = {...connection, id: `${edges.length} + 1`};

    //     setEdges((prevEdges) => addEdge(edge, prevEdges))
    // }, [])

    const onConnect = useCallback((connection: Connection) => {
        setEdges((prevEdges) => addEdge(connection, prevEdges))
    }, [])

    return (
    <div className="w-full h-[600px] border-2 border-neutral-500 rounded-2xl">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
        <Background />
      </ReactFlow>
    </div>
  );
}