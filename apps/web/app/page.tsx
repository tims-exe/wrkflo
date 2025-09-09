"use client"

import { useEffect, useState } from "react"
import axios from 'axios'

export default function Home() {
  const [test, setTest] = useState("setup")

  useEffect(() => {
    async function getServerResponse() {
      const response = await axios.get('http://localhost:5000/')
      if (response.data){
        console.log(response)
        setTest(response.data.message)
      }
    }

    getServerResponse()
  }, [])

  return (
    <div>
      {test}
    </div>
  )
}