import WorkflowComponent from "../../../components/workflow/WorkflowComponent";

export default async function Workflow({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="px-10 py-10 flex flex-col">
        {/* <p className="mb-5">
            workflow {id}
        </p> */}
        <WorkflowComponent workflowId={id}/>
    </div>
  );
}
