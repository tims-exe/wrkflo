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
import { TelegramNodeData } from "types";
import CredentialsSelector from "@/components/ui/CredentialsSelector";

interface ActionComponentProps<T extends NodeData & Record<string, unknown>> {
  name: string;
  handleNodeClick: (nodeData: TelegramNodeData) => void;
  children?: React.ReactNode;
  existingData?: Partial<T>;
}

export default function TelegramAction({
  name,
  handleNodeClick,
  children,
  existingData
}: ActionComponentProps<TelegramNodeData & Record<string, unknown>>) {
  const [creds, setCreds] = useState<string>(existingData?.credentials || "");
  const [chatId, setChatId] = useState<string>(existingData?.chatId || "");
  const [text, setText] = useState<string>(existingData?.message || "");

  console.log('existing data : ', existingData)

  const handleSave = () => {
      const nodeData: TelegramNodeData = {
          label: 'Telegram',
          credentials: creds,
          chatId: chatId,
          message: text,
          actionType: "telegram"
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
          <DialogTitle>
            {existingData ? "Edit Telegram Action" : "Send a Message in Telegram"}
          </DialogTitle>
        </DialogHeader>

        <div>
          <CredentialsSelector
            value={creds}
            onValueChange={setCreds}
            placeholder="Select Telegram credentials"
            app="telegram"
          />

          <p className="text-md text-neutral-400 mt-5">Chat ID</p>
          <input
            value={chatId}
            onChange={(e) => setChatId(e.target.value)}
            type="text"
            className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2"
          />

          <p className="text-md text-neutral-400 mt-5">Text</p>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
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