"use client"

import { redirect } from "next/navigation"

export default function Button({ name, url}: {
    name: string,
    url: string
}) {
    return <button onClick={() => {
        redirect(url)
    }}
    className="bg-neutral-950 border-2 border-neutral-600 rounded-2xl px-5 py-2 hover:bg-neutral-800 hover:cursor-pointer transition-colors duration-200">
        { name }
    </button>
}