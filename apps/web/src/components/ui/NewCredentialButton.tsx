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
import { useState, useRef } from "react";
import axios from "axios";
import { useCredentialStore } from "@/state/credentialsState";

export default function NewCredentialsButton() {
  const [key, setKey] = useState("");
  const [app, setApp] = useState("");
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const addCredential = useCredentialStore(state => state.addCredentials);

  async function createCred() {
    if (!app || !key) {
      console.log("App and key are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/credentials/new`,
        { app, key },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (res.data.success) {
        console.log("Credential created:", res.data.credential);
        addCredential(res.data.credential);
        setKey("");
        setApp("");
        dialogCloseRef.current?.click();
      } else {
        console.log("Failed to create credential:", res.data.message);
      }
    } catch (error) {
      console.error("Error creating credential:", error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-neutral-800 rounded-2xl px-5 py-2 hover:bg-neutral-700 hover:cursor-pointer transition-colors duration-200">
        New Cred +
      </DialogTrigger>
      <DialogContent className="borde-2 border-neutral-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle>New Credential</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <Select onValueChange={(value) => setApp(value)} value={app}>
            <SelectTrigger className="w-[180px] rounded-[10px]">
              <SelectValue placeholder="Application" />
            </SelectTrigger>
            <SelectContent className="rounded-[10px]">
              <SelectItem value="telegram" className="rounded-[10px]">
                Telegram
              </SelectItem>
              <SelectItem value="email" className="rounded-[10px]">
                Email
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-md text-neutral-400 mt-5">Key</p>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value.replace(/\s/g, ""))}
            type="text"
            className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2"
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <button
            onClick={createCred}
            className="bg-neutral-700 px-3 py-2 rounded-[10px] hover:cursor-pointer"
          >
            Save
          </button>
          <DialogClose ref={dialogCloseRef} className="hidden" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}