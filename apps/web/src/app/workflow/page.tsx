import NewWorkflowButton from "@/components/ui/NewWorkflowButton"
import WorkflowDashboard from "@/components/workflow/WorkflowDashboard"

export default async function Dashboard() {

    return (
        <div className="px-32 py-20">
            <div className="flex justify-between items-center mb-10">
                <p className="text-2xl">Dashboard</p>
                <NewWorkflowButton />
            </div>
            <WorkflowDashboard />
        </div>
    )
}