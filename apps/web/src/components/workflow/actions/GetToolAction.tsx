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
import { ToolNodeData } from "types";

interface GetToolActionProps {
  name: string;
  handleNodeClick: (nodeData: ToolNodeData) => void;
  children?: React.ReactNode;
  existingData?: ToolNodeData;
}
export default function GetToolAction({
  name,
  handleNodeClick,
  children,
  existingData,
}: GetToolActionProps) {

    const [type, setType] = useState<string>(existingData?.type || "")
  const handleSave = () => {
    const nodeData: ToolNodeData = {
      label: name,
      type: type
    };

    handleNodeClick(nodeData);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5">
            {name}
          </button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Setup Get Tool Parameters</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-md text-neutral-400 mt-5">URL</p>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
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
