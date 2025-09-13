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
import { ModelNodeData } from "types";
import CredentialsSelector from "@/components/ui/CredentialsSelector";

interface ModelActionProps {
  name: string;
  handleNodeClick: (nodeData: ModelNodeData) => void;
  children?: React.ReactNode;
  existingData?: ModelNodeData
}

export default function ModelAction({
  name,
  handleNodeClick,
  children,
  existingData,
}: ModelActionProps) {
  const [api, setApi] = useState<string>(existingData?.apiKey || "")
  const [model, setModel] = useState(existingData?.model || "")

  const handleSave = () => {
    const nodeData: ModelNodeData = {
      label: name,
      apiKey: api,
      model: model
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
          <DialogTitle>Setup Model Parameters</DialogTitle>
        </DialogHeader>
        <div>
          <CredentialsSelector
            value={api}
            onValueChange={setApi}
            placeholder="Select API key credentials"
            label="API Key"
            app="openai"
          />
          
          <p className="text-md text-neutral-400 mt-5">Model</p>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
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