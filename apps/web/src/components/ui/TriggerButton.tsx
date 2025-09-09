"use client"

interface TriggerButtonProps {
  name: string;
  handleTriggerClick: (name: string) => void;
}

export default function TriggerButton({ name, handleTriggerClick }: TriggerButtonProps) {
  return (
    <button
      onClick={() => handleTriggerClick(name)}
      className="bg-neutral-700 w-full px-4 py-4 rounded-2xl hover:cursor-pointer text-start mb-5"
    >
      {name}
    </button>
  )
}
