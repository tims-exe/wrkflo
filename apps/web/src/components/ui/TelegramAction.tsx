/* eslint-disable @typescript-eslint/no-unused-vars */
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


interface ActionComponentProps<T extends NodeData & Record<string, unknown>> {
  name: string;
  handleNodeClick: <U extends NodeData & Record<string, unknown>>(nodeType: string, data: U) => void;
}

export default function TelegramAction({name, handleNodeClick}: ActionComponentProps<TelegramNodeData & Record<string, unknown>>) {
  const [creds, setCreds] = useState<string>("")
  const [chatId, setChatId] = useState<string>("")
  const [text, setText] = useState<string>("")

  const handleSave = (): void => {
    const nodeData: TelegramNodeData = {
      label: name,
      credentials: creds,
      chatId: chatId,
      message: text
    };
    handleNodeClick('telegram-action', nodeData as TelegramNodeData & Record<string, unknown>);
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5">
        {name}
      </DialogTrigger>
      <DialogContent className="borde-2 border-neutral-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle>Send a Message in Telegram</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-md text-neutral-400 mt-5">Credentials</p>
          <input 
            value={creds}
            onChange={(e) => setCreds(e.target.value)}
            type="text" 
            className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2" 
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
            onChange={e => setText(e.target.value)} 
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
  )
}