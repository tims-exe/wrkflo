"use client"

import type { Node, NodeProps } from '@xyflow/react';

type CustomNodeData = { label: string };
export type CustomNodeType = Node<CustomNodeData, 'custom'>;

export function CustomNode({ data }: NodeProps<CustomNodeType>) {
  return (
    <div className="px-4 py-2 rounded-lg shadow-md bg-neutral-600 text-white">
      {data.label}
    </div>
  );
}
