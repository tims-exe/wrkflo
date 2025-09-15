import Button from "../ui/Button";

interface NavbarProps {
    title: string,
}

export default function Navbar({ title }: NavbarProps) {
    return (
        <div className="w-full py-6 px-10 flex justify-between">
            <p className="text-2xl font-semibold">
             {title}
            </p>
            <div className="space-x-5">
                <Button name="Workflows" url="/workflow" />
                <Button name="Credentials" url="/credentials" />
            </div>
        </div>
    )
}