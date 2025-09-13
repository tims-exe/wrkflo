import { useEffect } from "react"
import axios from "axios"
import { useCredentialStore } from "@/state/credentialsState"

export function useCredentials() {
  const { credentials, setCredentials, removeCredentials } = useCredentialStore()

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

  return {
    credentials,
    handleDeleteCred
  }
}