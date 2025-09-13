"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useRef } from "react"
import { useCredentialStore } from "@/state/credentialsState"

export default function CredentialsDashboard() {
  const { credentials, setCredentials, removeCredentials } = useCredentialStore()
  const credentialsRef = useRef(credentials)
  
  credentialsRef.current = credentials

  useEffect(() => {
    const fetchCreds = async () => {
      console.log('fetching')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/credentials`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      })
      console.log('fetched creds')
      console.log(response.data)
      if (response.data.success) {
        setCredentials(response.data.credentials)
      }
    }  

    fetchCreds()
  }, [setCredentials])

  async function handleDeleteCred(id: string) {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/credentials/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })

    if (res.data.success === false) {
      console.log('failed deltion', res.data.message)
      return 
    }

    removeCredentials(id)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Credentials</TableHead>
          <TableHead>Key</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {credentialsRef.current.map((c) => (
          <TableRow key={c._id}>
            <TableCell className="font-medium">{c.app}</TableCell>
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
  )
}