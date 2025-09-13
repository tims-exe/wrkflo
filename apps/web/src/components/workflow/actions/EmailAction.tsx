"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { NodeData } from "@/types/nodes";
import { useState } from "react";
import { EmailNodeData } from "types";

interface ActionComponentProps<T extends NodeData & Record<string, unknown>> {
  name: string;
  handleNodeClick: (nodeData: EmailNodeData) => void;
  children?: React.ReactNode;
  existingData?: Partial<T>;
}

export default function EmailAction({
  name,
  handleNodeClick,
  children,
  existingData
}: ActionComponentProps<EmailNodeData & Record<string, unknown>>) {
  const [creds, setCreds] = useState<string>(existingData?.credentials || "");
  const [body, setBody] = useState<string>(existingData?.body || "");

  const handleSave = () => {
    const nodeData: EmailNodeData = {
        label: 'Email',
        credentials: creds,
        body: body,
        actionType: "email"
    }
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
          <DialogTitle>{existingData ? "Edit Email Action" : "Send an Email"}</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-md text-neutral-400 mt-5">Credentials</p>
          <input
            value={creds}
            onChange={(e) => setCreds(e.target.value)}
            type="text"
            className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2"
          />

          <p className="text-md text-neutral-400 mt-5">Email body</p>
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
