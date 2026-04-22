import { UserCog } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div onClick={() => navigate("/admin")}>
          <Button variant={"outline"}>
            <UserCog className="text-orange-500 dark:text-white" />
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent className="dark:bg-white dark:text-gray-600">
        Admin dashboard
      </TooltipContent>
    </Tooltip>
  )
}

export default AdminDashboard
