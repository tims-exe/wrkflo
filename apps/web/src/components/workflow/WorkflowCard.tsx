"use client"
import { WorkflowResponseData } from "@/types/workflow";
import { useRouter } from "next/navigation";

interface WorkflowCardType { 
    wrkflo: WorkflowResponseData
}

export default function WorkflowCard({ wrkflo } : WorkflowCardType) {
    const router = useRouter();
    
    return (
        <button onClick={() => router.push(`/workflow/${wrkflo._id}`)}
        className="border-2 border-neutral-500 w-full py-5 rounded-2xl flex items-start px-10 hover:cursor-pointer hover:bg-neutral-900 transition-all duration-200">
            {wrkflo.name}
        </button>
    )
}