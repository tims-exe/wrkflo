import WorkflowComponent from "../../../components/workflow/WorkflowComponent";

export default async function Workflow({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="px-10 py-10 flex flex-col">
        <p className="mb-5">
            workflow {id}
        </p>
      <div className="flex w-full gap-10">
        <WorkflowComponent />
        <div className="w-[300px] bg-transparent border-2 rounded-2xl border-neutral-500 px-5 py-5">
            <p>
                Triggers
            </p>
            <div className="w-full bg-neutral-600 h-0.5 my-3"></div>
            
        </div>
      </div>
    </div>
  );
}
