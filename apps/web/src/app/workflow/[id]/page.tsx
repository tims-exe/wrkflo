export default async function Workflow({ params }: { params: { id: string } }) {
  const id = (await params).id;

  return (
    <div className="px-10 py-10">
      workflow {id}
    </div>
  );
}
