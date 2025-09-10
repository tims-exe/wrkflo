export default function Dashboard() {
    // fetch all worflows and store em

    const initialWorkflows = [
        {
            id: '1',
            name: 'wrkflo1',
            enabled: false
        },
    ]
    return (
        <div className="px-10 py-10">
            <p>Dashboard</p>
            {initialWorkflows.map((w, index) => (
                <div key={index}>
                    {w.name}
                </div>
            ))}
        </div>
    )
}