import Button from "@/components/ui/Button"
import NewWorkflowButton from "@/components/ui/NewWorkflowButton"
import WorkflowDashboard from "@/components/workflow/WorkflowDashboard"

export default async function Dashboard() {

    return (
        <div className="px-32 py-20">
            <div className="flex justify-between items-center mb-10">
                <p className="text-2xl">Dashboard</p>
                <div className="space-x-10">
                    <Button name="Credentials" url="/credentials" />
                    <NewWorkflowButton />
                </div>
            </div>
            <WorkflowDashboard />
        </div>
    )
}