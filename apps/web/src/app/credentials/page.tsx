import CredentialsDashboard from "@/components/credentials/CredentialsDashboard";
import Navbar from "@/components/main/Navbar";
import NewCredentialsButton from "@/components/ui/NewCredentialButton";

export default function Credentials() {
  return (
    <div>
      <Navbar title={"Credentials"} />
      <div className="px-32 py-10">
        <div className="flex justify-end items-center pb-5">
            <NewCredentialsButton />
        </div>
        <CredentialsDashboard />
      </div>
    </div>
  );
}
