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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NodeData } from "@/types/nodes";
import { useState, useRef, useEffect } from "react";
import { WebhookNodeData } from "types";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface WebhookActionProps<T extends NodeData & Record<string, unknown>> {
  name: string;
  handleNodeClick: (nodeData: WebhookNodeData) => void;
  children?: React.ReactNode;
  existingData?: WebhookNodeData;
  w_id?: string;
}

export default function WebhookAction({
  name,
  handleNodeClick,
  children,
  existingData,
  w_id,
}: WebhookActionProps<WebhookNodeData & Record<string, unknown>>) {
  function generateWebhookId(workflowId: string): string {
    return `${workflowId}-${nanoid(6)}`;
  }

  const [url, setUrl] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [apiMethod, setApiMethod] = useState<"GET" | "POST">("GET");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (existingData?.url) {
        setUrl(existingData.url);
        setApiMethod(existingData.type as "GET" | "POST" || "GET");
      } else if (w_id) {
        setUrl(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/webhook/handler/${generateWebhookId(w_id)}`);
        setApiMethod("GET");
      }
    }
  }, [isOpen, existingData, w_id]);

  const handleSave = () => {
    const nodeData: WebhookNodeData = {
      label: "Webhook",
      triggerType: "webhook",
      url,
      method: apiMethod,
      workflowId: w_id!,
    };
    handleNodeClick(nodeData);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast("Copied to clipboard!", {
        icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
        style: {
          background: "black",
          color: "white",
          border: "1px solid #333",
        },
      });
    } catch (err) {
      toast("Failed to copy URL", {
        icon: <CheckCircle2 className="w-5 h-5 text-red-500" />,
        style: {
          background: "black",
          color: "white",
          border: "1px solid #333",
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="bg-neutral-900 border-2 border-neutral-600 hover:bg-neutral-800 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5">
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

        <div className="mt-3">
          <Select
            onValueChange={(value: "GET" | "POST") => setApiMethod(value)}
            value={apiMethod}
          >
            <SelectTrigger className="w-[180px] rounded-[10px]">
              <SelectValue placeholder="API Method" />
            </SelectTrigger>
            <SelectContent className="rounded-[10px]">
              <SelectItem value="GET" className="rounded-[10px]">
                GET
              </SelectItem>
              <SelectItem value="POST" className="rounded-[10px]">
                POST
              </SelectItem>
            </SelectContent>
          </Select>

          <p className="text-md text-neutral-400 mt-5">Webhook URL</p>
          <p className="text-sm break-all border border-neutral-600 rounded-[15px] px-2 pt-4 py-3 bg-neutral-900">
            {url}
          </p>
          <button
            onClick={copyLink}
            className="hover:cursor-pointer hover:underline hover:underline-offset-2 text-neutral-500 text-sm text-end w-full px-2"
          >
            Copy
          </button>
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