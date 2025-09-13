import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="text-3xl my-5">wrkflo</p>
      <Button name={'start'} url={'/workflow'} />
    </div>
  )
}