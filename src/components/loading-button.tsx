import { Button } from "./ui/button"

const LoadingButton = () => {
  return (
    <Button
      disabled
      className="w-full animate-pulse bg-gray-500 transition-all"
    >
      Loading
    </Button>
  )
}

export default LoadingButton
