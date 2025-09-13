/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { NodeData } from "@/types/nodes";
import { useState } from "react";
import { WebhookNodeData } from "types";

interface WebhookActionProps<T extends NodeData & Record<string, unknown>> {
  name: string;
  handleNodeClick: (nodeData: WebhookNodeData) => void;
  children?: React.ReactNode;
  existingData?: WebhookNodeData;
}

export default function WebhookAction({
  name,
  handleNodeClick,
  children,
  existingData,
}: WebhookActionProps<WebhookNodeData & Record<string, unknown>>) {
  const [url, setUrl] = useState<string>(existingData?.url || "");

  const handleSave = () => {
    const nodeData: WebhookNodeData = {
      label: "Webhook",
      triggerType: "webhook",
      url: url,
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

      <DialogContent className="border-2 border-neutral-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {existingData ? "Edit Webhook Trigger" : "Setup Webhook Trigger"}
          </DialogTitle>
        </DialogHeader>

        <div>
          <p className="text-md text-neutral-400 mt-5">Webhook URL</p>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            placeholder="https://example.com/webhook"
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
