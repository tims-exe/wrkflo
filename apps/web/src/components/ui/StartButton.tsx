"use client"

import { redirect } from "next/navigation"

export default function StartButton() {
    return <button onClick={() => {
        redirect('/workflow')
    }}
    className="px-4 py-3 bg-neutral-700 rounded-2xl hover:cursor-pointer">
        Start
    </button>
}