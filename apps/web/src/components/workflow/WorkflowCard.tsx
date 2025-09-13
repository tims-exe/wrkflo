"use client"
import { WorkflowResponseData } from "@/types/workflow";
import { useRouter } from "next/navigation";

interface WorkflowCardType { 
    wrkflo: WorkflowResponseData
    onDelete: (id: string) => void
}

export default function WorkflowCard({ wrkflo, onDelete } : WorkflowCardType) {
    const router = useRouter();
    
    return (
        <div className="border-2 border-neutral-500 w-full rounded-2xl flex items-center">
            <button onClick={() => router.push(`/workflow/${wrkflo._id}`)}
            className="hover:cursor-pointer py-5 w-full hover:bg-neutral-900 transition-all duration-200 px-10 text-start rounded-2xl">
                {wrkflo.name}
            </button>
            <button onClick={() => onDelete(wrkflo._id)}
            className="flex justify-center items-end w-20 text-red-400 hover:cursor-pointer">
                X
            </button>
        </div>
    )
}