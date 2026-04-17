import { Info, Store } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { Field, FieldGroup, FieldLabel } from "./ui/field"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import LoadingButton from "./loading-button"
import { cn } from "@/lib/utils"
import { useGetMyUser } from "@/api/MyUserApi"

const roleRequestSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  fullAddress: z
    .string()
    .min(1, "Address is required")
    .max(250, "Address cannot exceed 250 characters"),
  reason: z.string().min(1, "Reason is required"),
  documents: z.boolean(),
  requestedRole: z.string().optional(),
  feedback: z.string().optional(),
  currentRole: z.string().optional(),
})

type RoleRequestFormData = z.infer<typeof roleRequestSchema>

type Props = {
  onRequest: (requestData: RoleRequestFormData) => void
  isLoading: boolean
  roleStatus: string
  isExisting: boolean
}

const RoleRequest = ({
  onRequest,
  isLoading,
  roleStatus,
  isExisting,
}: Props) => {
  const { currentUser } = useGetMyUser()

  const form = useForm<RoleRequestFormData>({
    resolver: zodResolver(roleRequestSchema),
    defaultValues: {
      email: "",
      requestedRole: "Owner",
      currentRole: "",
      documents: false,
      name: "",
      fullAddress: "",
      feedback: "",
      reason: "",
    },
  })

  const onSubmit = (data: RoleRequestFormData) => {
    onRequest({
      ...data,
      requestedRole: "Owner",
      currentRole: currentUser?.role,
    })
  }

  if (isExisting) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              roleStatus === "pending"
                ? "disabled:bg-gray-500"
                : roleStatus === "approved"
                  ? "bg-green-400"
                  : "bg-red-400"
            )}
          >
            <Button variant={"outline"} className="fill-white">
              <Store
                className={cn(
                  roleStatus === "pending"
                    ? "text-gray-400"
                    : roleStatus === "approved"
                      ? "text-green-400"
                      : "text-red-400",
                  "dark:opacity-40"
                )}
              />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {roleStatus === "pending" ? (
            <div className="flex items-center justify-center gap-2">
              <Info className="h-3 w-3 text-white dark:text-orange-500" />
              <span className="text-[12px] font-semibold tracking-tight text-white dark:text-gray-600">
                You already have a pending Request. Kindly wait back till it's
                processed
              </span>
            </div>
          ) : roleStatus === "approved" ? (
            <div className="flex items-center justify-center gap-2">
              <Info className="h-3 w-3 text-white dark:text-orange-500" />
              <span className="text-[12px] font-semibold tracking-tight text-white dark:text-gray-600">
                "Your role change request has been approved. Happy Vivatoing!"
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Info className="h-3 w-3 text-white dark:text-orange-500" />
              <span className="text-[12px] font-semibold tracking-tight text-white dark:text-gray-600">
                "Your role change request has been declined. Try raising request
                after 24hrs"
              </span>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Button variant={"outline"} className="fill-white">
                  <Store className="text-orange-500 dark:text-white" />
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-black dark:bg-white">
              Want to become an Owner!
            </TooltipContent>
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full md:max-w-md">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader className="flex items-center justify-center">
            <DialogTitle className="text-[14px] font-semibold md:text-[15px]">
              Vivato Role Change Request
            </DialogTitle>
            <DialogDescription className="text-[12px] md:text-[14px]">
              Make a request for your role change from <strong>Customer</strong>{" "}
              to <strong>Owner</strong> here. Click 'Request' when you are done
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="flex items-center justify-center md:flex-row">
            <Controller
              name="email"
              control={form.control}
              render={() => (
                <Field>
                  <FieldLabel className="text-[10px] font-semibold tracking-tight md:text-[12px]">
                    Email
                  </FieldLabel>
                  <Input
                    value={currentUser?.email}
                    disabled
                    className="bg-white text-[12px] font-semibold tracking-tight md:text-[13px]"
                  />
                </Field>
              )}
            />
            <Controller
              name="name"
              control={form.control}
              render={() => (
                <Field>
                  <FieldLabel className="text-[10px] tracking-tight md:text-[12px]">
                    Name
                  </FieldLabel>
                  <Input
                    className="bg-white text-[12px] tracking-tight md:text-[13px]"
                    disabled={!!currentUser?.name}
                    value={currentUser?.name}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="fullAddress"
              render={({ field }) => (
                <Field>
                  <FieldLabel className="text-[10px] tracking-tight md:text-[12px]">
                    Address
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="text-[10px] md:text-[10px] dark:bg-gray-100">
                        (House No, Locality, Street, city, state, country,
                        zip-code)
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter your address"
                    className="bg-white text-[12px] tracking-tight placeholder:text-[9px] md:text-[13px] placeholder:md:text-[12px]"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="reason"
              render={({ field }) => (
                <Field>
                  <FieldLabel className="text-[10px] tracking-tight md:text-[12px]">
                    Reason for change{" "}
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="text-[10px] md:text-[10px] dark:bg-gray-100">
                        Enter your complete reason for the role change
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Reason for your role change"
                    className="no-scrollbar h-4 overflow-y-scroll text-[12px] placeholder:text-[9px] md:text-[13px] placeholder:md:text-[12px]"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="requestedRole"
              render={() => (
                <Field className="w-[80%]">
                  <FieldLabel className="flex items-center text-[10px] tracking-tight md:text-[12px]">
                    Role
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-3 w-3 text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="text-[10px] md:text-[10px] dark:bg-gray-100">
                        By default the role is changed to Owner
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
                  <Input
                    disabled
                    className="text-[8px] md:text-[12px]"
                    value={"Owner"}
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              control={form.control}
              name="documents"
              render={({ field }) => (
                <Field className="w-4">
                  <FieldLabel className="flex items-center gap-2">
                    <span className="text-[9px] tracking-tight md:text-[12px]">
                      Documents?
                    </span>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-2">
                        <Info className="h-3 w-3 text-orange-500" />
                      </TooltipTrigger>
                      <TooltipContent className="text-[10px] md:text-[10px] dark:bg-gray-100">
                        Do you have all the required documents? (PAN Card +
                        Aaadhar Card + Hotel License )
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-orange-500"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <div className="w-full">
            {isLoading ? (
              <LoadingButton />
            ) : (
              <div className="flex w-full items-center justify-between gap-2">
                <Button
                  onClick={() => form.reset()}
                  type="reset"
                  className="flex-1 bg-blue-600 text-[9px] md:text-[12px] dark:bg-orange-700 dark:text-white"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  className="w-full flex-1 bg-orange-700 text-[9px] md:text-[12px] dark:bg-green-700 dark:text-white"
                >
                  Request
                </Button>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RoleRequest
