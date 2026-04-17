import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const Logo = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate("/")}
      variant={"outline"}
      className="flex w-auto shrink-0 items-center gap-2 border-none bg-background px-2"
      size={"sm"}
    >
      <img src="/logo.svg" alt="Vivato" className="h-6 w-6" />
      <span className="hidden text-3xl font-semibold tracking-tight text-orange-500 sm:inline dark:text-white">
        Vivato
      </span>
    </Button>
  )
}

export default Logo
