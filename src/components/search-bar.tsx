import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import z from "zod"
import { Field, FieldGroup } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

const formSchema = z.object({
  searchQuery: z.string().min(1, { error: "Restaurant name is required" }),
})

export type SearchForm = z.infer<typeof formSchema>

type Props = {
  onSubmit: (formData: SearchForm) => void
  placeHolder: string
  onReset?: () => void
  searchQuery?: string
}

const SearchBar = ({ placeHolder, onReset, onSubmit, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery },
  })

  useEffect(() => {
    form.reset({ searchQuery })
  }, [form, searchQuery])

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    })

    if (onReset) {
      onReset()
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-row items-center justify-between gap-3 rounded-full border-2 p-3",
          form.formState.errors.searchQuery && "border-red-500"
        )}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 hidden text-orange-500 md:block"
        />
        <FieldGroup>
          <Controller
            control={form.control}
            name="searchQuery"
            render={({ field }) => (
              <Field>
                <Input
                  {...field}
                  className="border-none text-xl shadow-none placeholder:text-[9px] focus-visible:ring-0 md:placeholder:text-[13px]"
                  placeholder={placeHolder}
                />
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          onClick={handleReset}
          type="button"
          variant={"outline"}
          className="rounded-full text-[9px] md:text-[12px]"
        >
          Reset
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-orange-500 text-[9px] text-white md:text-[12px]"
        >
          Search
        </Button>
      </form>
    </FormProvider>
  )
}

export default SearchBar
