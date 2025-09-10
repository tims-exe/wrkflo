import WorkflowCard from "@/components/workflow/WorkflowCard"
import { WorkflowData } from "types"

export default function Dashboard() {
    // fetch all worflows and store em

    const initialWorkflows: WorkflowData[] = [
        {
            id: '1',
            name: 'wrkflo1',
            enabled: false
        },
        {
            id: '2',
            name: 'wrkflo2',
            enabled: true
        },
    ]
    return (
        <div className="px-32 py-20">
            <div className="flex justify-between items-center">
                <p className="text-2xl">Dashboard</p>
                <button className="bg-neutral-800 rounded-2xl px-5 py-2 hover:bg-neutral-700 hover:cursor-pointer transition-colors duration-200">
                    New Wrkflo + 
                </button>
            </div>
            <div className="flex flex-col gap-5 items-start mt-20 mx-10">
                {initialWorkflows.map((w, index) => (
                    <WorkflowCard key={index} wrkflo={w}/>
                ))}
            </div>
        </div>
    )
}