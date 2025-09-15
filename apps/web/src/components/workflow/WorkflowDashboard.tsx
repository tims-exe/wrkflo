"use client"

import { WorkflowResponseData } from "@/types/workflow"
import axios from "axios"
import { useEffect, useState } from "react"
import WorkflowCard from "./WorkflowCard"

export default function WorkflowDashboard() {
    const [currentWorkflows, setCurrentWorkflows] = useState<WorkflowResponseData[]>()

    useEffect(() => {
        const fetchWorkflows = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            })

            console.log(response.data)
            if (response.data.success) {
                setCurrentWorkflows(response.data.workflows)
            }
        }  

        fetchWorkflows()
    }, [])

  async function handleDeleteWorkflow(id: string) {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow/${id}`, {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    })

    if (res.data.success === false) {
      console.log('failed deltion', res.data.message)
      return 
    }

    setCurrentWorkflows((prev) => prev?.filter((w) => w._id !== id))
  }

  return (
    <div className="flex flex-col gap-5 items-start my-5">
        {currentWorkflows && currentWorkflows.map((w, index) => (
            <WorkflowCard key={index} wrkflo={w} onDelete={handleDeleteWorkflow}/>
        ))}
    </div>
  )
}