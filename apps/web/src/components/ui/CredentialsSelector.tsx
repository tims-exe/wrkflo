"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCredentials } from "@/hooks/useCreds";

interface CredentialsSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  app?: string; 
}

export default function CredentialsSelector({
  value,
  onValueChange,
  placeholder = "Select credentials",
  label = "Credentials",
  app 
}: CredentialsSelectorProps) {
  const { credentials } = useCredentials();

  const filteredCredentials = app 
    ? credentials?.filter(credential => credential.app === app)
    : credentials;

  return (
    <div>
      <p className="text-md text-neutral-400 mt-5">{label}</p>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-transparent border-2 border-neutral-600 w-full rounded-[10px] py-5">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-2xl">
          {filteredCredentials?.map((credential) => (
            <SelectItem key={credential.key} value={credential.key} className="rounded-2xl">
              {credential.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}