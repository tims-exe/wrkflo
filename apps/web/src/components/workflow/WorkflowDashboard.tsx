"use client"

import WorkflowCard from "./WorkflowCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { WorkflowResponseData } from "@/types/workflow";


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

    return (
        <div className="flex flex-col gap-5 items-start mt-20 mx-10">
            {currentWorkflows && currentWorkflows.map((w, index) => (
                <WorkflowCard key={index} wrkflo={w}/>
            ))}
        </div>
    )
}