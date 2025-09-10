"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { WorkflowResponseData } from "@/types/workflow"
import axios from "axios"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

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
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead >Wrkflo</TableHead>
          <TableHead>Enabled</TableHead>
          <TableHead>Open</TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentWorkflows && currentWorkflows.map((w, index) => (
            <TableRow key={index}>
                <TableCell className="font-medium">{w.name}</TableCell>
                <TableCell>{w.enabled}</TableCell>
                <TableCell>
                    <button onClick={() => redirect(`/workflow/${w._id}`)}
                    className="hover:cursor-pointer">
                        O
                    </button>
                </TableCell>
                <TableCell className="text-right">
                    <button>
                        X
                    </button>
                </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}


// "use client"

// import WorkflowCard from "./WorkflowCard";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { WorkflowResponseData } from "@/types/workflow";


// export default function WorkflowDashboard() {
//     const [currentWorkflows, setCurrentWorkflows] = useState<WorkflowResponseData[]>()

//     useEffect(() => {
//         const fetchWorkflows = async () => {
//             const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workflow`, {
//                 headers: {
//                     Authorization: `${localStorage.getItem('token')}`
//                 }
//             })

//             console.log(response.data)
//             if (response.data.success) {
//                 setCurrentWorkflows(response.data.workflows)
//             }
//         }  

//         fetchWorkflows()
//     }, [])

//     return (
//         <div className="flex flex-col gap-5 items-start mt-20 mx-10">
//             {currentWorkflows && currentWorkflows.map((w, index) => (
//                 <WorkflowCard key={index} wrkflo={w}/>
//             ))}
//         </div>
//     )
// }