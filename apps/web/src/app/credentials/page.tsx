import CredentialsDashboard from "@/components/credentials/CredentialsDashboard";
import Button from "@/components/ui/Button";
import NewCredentialsButton from "@/components/ui/NewCredentialButton";

export default function Credentials() {
    return (
        <div className="px-32 py-20">
            <div className="flex justify-between items-center mb-10">
                <p className="text-2xl">Credentials</p>
                <div className="space-x-10">
                    <Button name="Workflows" url="/workflow" />
                    <NewCredentialsButton />
                </div>
            </div>
            <CredentialsDashboard />
        </div>
    )
}