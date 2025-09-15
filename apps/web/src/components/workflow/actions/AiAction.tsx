"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AiNodeData } from "types";

interface AiActionProps {
  name: string;
  handleNodeClick: (nodeData: AiNodeData) => void;
  children?: React.ReactNode;
  existingData?: AiNodeData
}
export default function AiAction({
  name,
  handleNodeClick,
  children,
  existingData,
}: AiActionProps) {
  const [systemPrompt, setSystemPrompt] = useState<string>(existingData?.systemPrompt || "");

  const handleSave = () => {
    const nodeData: AiNodeData = {
      label: "Agent",
      systemPrompt: systemPrompt,
      actionType: "agent",
    };

    handleNodeClick(nodeData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="bg-neutral-900 border-2 border-neutral-600 hover:bg-neutral-800 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5">
            {name}
          </button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Setup Ai Agent</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-md text-neutral-400 mt-5">System Prompt</p>
          <input
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            type="text"
            className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2"
          />
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <button
              onClick={handleSave}
              className="bg-neutral-700 px-3 py-2 rounded-[10px] hover:cursor-pointer"
            >
              Save
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
