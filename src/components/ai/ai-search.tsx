import { Sparkle } from "lucide-react"
import { Button } from "../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { useState } from "react"

type Props = {
  onClick: (userQuery: string) => void
  isLoading: boolean
}

const AiSearch = ({ onClick, isLoading }: Props) => {
  const [query, setQuery] = useState("")

  const handleClick = () => {
    onClick(query)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">AI Searching...</span>
      </div>
    )
  }

  return (
    <DialogContent className="sm:max-w-md md:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-center">AI Search</DialogTitle>
        <DialogDescription className="text-[11px] md:text-[15px]">
          Search on your favourite food or restaurant. AI does the hard work for
          you in finding the best options available
        </DialogDescription>
      </DialogHeader>
      <FieldGroup>
        <div className="flex items-center gap-2">
          <Field className="flex-1">
            <Input
              placeholder="Type here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-[10px] md:text-sm"
            />
          </Field>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={handleClick}
            variant={"outline"}
            className="bg-linear-to-r from-blue-300 to-red-300 text-[10px] md:text-sm dark:text-white"
          >
            <Sparkle className="h-3 w-3 md:h-4 md:w-4" />
            {isLoading ? "Searching..." : "Ask AI"}
          </Button>
        </div>
      </FieldGroup>
    </DialogContent>
  )
}

export default AiSearch
