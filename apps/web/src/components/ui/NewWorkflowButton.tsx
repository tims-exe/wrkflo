"use client"

import axios from "axios"
import { WorkflowData } from "types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { useState } from "react"
import { redirect } from "next/navigation"

type CreateWorkflowData = Omit<WorkflowData, "id" | "userId">;

export default function NewWorkflowButton() {
    const [name, setName] = useState("")

    async function createWorkflow() {
        const initialWorkflow: CreateWorkflowData = {
            name: name,
            enabled: false,
            nodes: [],
            connections: [],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
        const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/`,
            initialWorkflow,
            {
                headers: {
                Authorization: `${localStorage.getItem("token")}`
                }
            }
        );

        if (res.data.success) {
            redirect(`/workflow/${res.data.id}`)
        }

    }
    return (
    <Dialog>
      <DialogTrigger className="bg-neutral-800 rounded-2xl px-5 py-2 hover:bg-neutral-700 hover:cursor-pointer transition-colors duration-200">
        New Wrkflo + 
      </DialogTrigger>
      <DialogContent className="borde-2 border-neutral-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle>New Wrkflo</DialogTitle>
        </DialogHeader>
        <div>
          <p className="text-md text-neutral-400 mt-5">Name</p>
          <input 
          value={name}
          onChange={(e) => setName(e.target.value.replace(/\s/g, ""))}
          type="text" 
          className="bg-transparent border-2 border-neutral-600 w-full rounded-[5px] px-3 py-2" 
        />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <button 
              onClick={createWorkflow}
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