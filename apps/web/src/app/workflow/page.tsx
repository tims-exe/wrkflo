import Navbar from "@/components/main/Navbar";
import NewWorkflowButton from "@/components/ui/NewWorkflowButton";
import WorkflowDashboard from "@/components/workflow/WorkflowDashboard";

export default async function Dashboard() {
  return (
    <div>
      <Navbar title={"Workflows"}/>
      <div className="px-64">
        <div className="flex justify-end items-center mt-10">
            <NewWorkflowButton />
        </div>
        <WorkflowDashboard />
      </div>
    </div>
  );
}
