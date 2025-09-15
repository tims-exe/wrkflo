"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCredentials } from "@/hooks/useCreds";

export default function CredentialsDashboard() {
  const { credentials, handleDeleteCred } = useCredentials();

  return (
    <Table className="text-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Credentials</TableHead>
          <TableHead>App</TableHead>
          <TableHead>Key</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {credentials.map((c) => (
          <TableRow key={c._id}>
            <TableCell className="font-medium">{c.name}</TableCell>
            <TableCell>{c.app}</TableCell>
            <TableCell>{c.key}</TableCell>
            <TableCell className="text-right">
              <button
                onClick={() => handleDeleteCred(c._id)}
                className="hover:cursor-pointer text-red-400"
              >
                X
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
