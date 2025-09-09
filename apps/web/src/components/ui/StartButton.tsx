"use client"

import { redirect } from "next/navigation"

export default function StartButton() {
    return <button onClick={() => {
        redirect('/dashboard')
    }}
    className="px-4 py-3 bg-neutral-950 rounded-2xl hover:cursor-pointer">
        Start
    </button>
}