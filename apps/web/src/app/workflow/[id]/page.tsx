import WorkflowComponent from "../../../components/workflow/WorkflowComponent";

export default async function Workflow({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="flex flex-col">
        <WorkflowComponent workflowId={id}/>
    </div>
  );
}
