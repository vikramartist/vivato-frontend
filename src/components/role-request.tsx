/* eslint-disable react-hooks/exhaustive-deps */
import { Bike, Info, LucideHotel, Store } from "lucide-react"
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
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import LoadingButton from "./loading-button"
import { cn } from "@/lib/utils"
import { useGetMyUser } from "@/api/MyUserApi"
import { useEffect } from "react"
import type { RoleRequestType } from "@/type"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const roleRequestSchema = z.object({
  email: z.string().optional(),
  name: z.string().optional(),
  fullAddress: z
    .string()
    .min(1, "Address is required")
    .max(250, "Address cannot exceed 250 characters"),
  reason: z.string().min(1, "Reason is required"),
  documents: z.boolean(),
  requestedRole: z
    .enum(["Owner", "Rider", "Customer"])
    .describe("Role must be either Rider or Owner and is required"),
  feedback: z.string().optional(),
  currentRole: z.string().optional(),
})

type RoleRequestFormData = z.infer<typeof roleRequestSchema>

type Props = {
  onRequest: (requestData: RoleRequestFormData) => void
  isLoading: boolean
  roleStatus: string
  isExisting: boolean
  roleData: RoleRequestType
}

const RoleRequest = ({
  onRequest,
  isLoading,
  roleStatus,
  isExisting,
  roleData,
}: Props) => {
  const { currentUser } = useGetMyUser()

  const form = useForm<RoleRequestFormData>({
    resolver: zodResolver(roleRequestSchema),
    defaultValues: {
      email: "",
      currentRole: "",
      requestedRole: "Customer",
      name: "",
      fullAddress: "",
      feedback: "",
      reason: "",
    },
  })

  const role = form.watch("requestedRole")
  const toastKey = `role-toast-${roleData?.id}`

  const onSubmit = (data: RoleRequestFormData) => {
    if (data.requestedRole === "Customer") return

    onRequest({
      ...data,
      currentRole: currentUser?.role,
    })
  }

  useEffect(() => {
    if (!roleData) return

    const alreadyShown = sessionStorage.getItem(toastKey)

    if (alreadyShown) return

    if (roleData.status === "approved") {
      if (roleData.currentRole === "Owner") {
        toast.success(
          "Horray!, you have been promoted to Owner, now you can create and own your restaurants. Happy Vivatoing!🎉🎊",
          { duration: 500 }
        )
      } else if (roleData.currentRole === "Rider") {
        toast.success(
          "Horray!, you have been promoted to Rider, now you can accept and deliver orders. Happy Vivatoing!🎉🎊",
          { duration: 500 }
        )
      }
    }

    if (roleData.status === "declined") {
      toast.warning(
        "Oh Oh, you're request for role change has been declined. Try raising the request again!. Reason has been mailed to you",
        { duration: 500 }
      )
    }

    sessionStorage.setItem(toastKey, "shown")
  }, [roleData?.status, roleData?.currentRole])

  useEffect(() => {
    form.reset(roleData)
  }, [roleData, form])

  if (isExisting) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={
              (cn(
                roleStatus === "pending"
                  ? "disabled:bg-gray-500"
                  : roleStatus === "approved"
                    ? "disabled:bg-green-400"
                    : "bg-red-400"
              ),
              "border-none")
            }
          >
            <Button
              variant={"outline"}
              className={cn(
                roleStatus === "pending"
                  ? "bg-gray-400 hover:bg-gray-400 dark:bg-gray-200 dark:hover:bg-gray-200"
                  : roleStatus === "approved"
                    ? "bg-green-400 hover:bg-green-400 dark:bg-green-200 dark:hover:bg-green-200"
                    : "bg-red-400 hover:bg-red-400 dark:bg-red-200 dark:hover:bg-red-200"
              )}
            >
              {roleData.requestedRole === "Rider" && (
                <Bike
                  className={cn(
                    roleStatus === "pending"
                      ? "bg-gray-400 text-white dark:bg-gray-200 dark:text-white"
                      : roleStatus === "approved"
                        ? "bg-green-400 text-white dark:bg-green-200 dark:text-white"
                        : "bg-red-400 text-white dark:bg-red-200 dark:text-white",
                    "dark:opacity-100"
                  )}
                />
              )}
              {roleData.requestedRole === "Owner" && (
                <LucideHotel
                  className={cn(
                    roleStatus === "pending"
                      ? "bg-gray-400 text-white dark:bg-gray-200 dark:text-white"
                      : roleStatus === "approved"
                        ? "bg-green-400 text-white dark:bg-green-200 dark:text-white"
                        : "bg-red-400 text-white dark:bg-red-200 dark:text-white",
                    "dark:opacity-100"
                  )}
                />
              )}
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
              <Info className="h-3 w-3 text-white dark:text-green-500" />
              <span className="text-[12px] font-semibold tracking-tight text-white dark:text-gray-600">
                Your role change request has been approved and you are a{" "}
                {roleData?.currentRole}. Happy Vivatoing!
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Info className="h-3 w-3 text-white dark:text-red-500" />
              <span className="text-[12px] font-semibold tracking-tight text-white dark:text-gray-600">
                Your role change request has been declined. Try raising request
                again by following the comments provided in sometime.
              </span>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <>
      {currentUser?.role === "Customer" ||
        roleData?.status === "declined" ||
        roleData?.status === undefined}
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
                Want to become an Owner/Rider!
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
                Make a request for your role change from{" "}
                <strong>Customer</strong> to <strong>{role}</strong> here. Click
                'Request' when you are done
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
                render={({ fieldState }) => (
                  <Field>
                    <FieldLabel className="text-[10px] tracking-tight md:text-[12px]">
                      Name
                    </FieldLabel>
                    <Input
                      className="bg-white text-[12px] tracking-tight md:text-[13px]"
                      disabled={!!currentUser?.name}
                      value={currentUser?.name}
                    />
                    <FieldError className="text-[8px] tracking-wide md:text-[13px]">
                      {fieldState.error?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="fullAddress"
                render={({ field, fieldState }) => (
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
                      type="text"
                      {...field}
                      placeholder="Enter your address"
                      className="bg-white text-[12px] tracking-tight placeholder:text-[9px] md:text-[13px] placeholder:md:text-[12px]"
                    />
                    <FieldError className="text-[8px] tracking-wide md:text-[13px]">
                      {fieldState.error?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="reason"
                render={({ field, fieldState }) => (
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
                    <FieldError className="text-[8px] tracking-wide md:text-[13px]">
                      {fieldState.error?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="requestedRole"
                render={({ field, fieldState }) => (
                  <Field className="w-[80%]">
                    <FieldLabel className="flex items-center text-[10px] tracking-tight md:text-[12px]">
                      Role
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-3 w-3 text-orange-500" />
                        </TooltipTrigger>
                        <TooltipContent className="text-[10px] md:text-[10px] dark:bg-gray-100">
                          Choose a role from the dropdown
                        </TooltipContent>
                      </Tooltip>
                    </FieldLabel>
                    <DropdownMenu>
                      <div>
                        <DropdownMenuTrigger asChild>
                          <div>
                            <Button
                              variant={"outline"}
                              defaultValue={field.value}
                              className="md:;text-sm text-[9px]"
                            >
                              {field.value ?? "Select Role"}
                            </Button>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full">
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-[9px] md:text-[13px]">
                              Select Role
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => field.onChange("Owner")}
                              className="text-[9px] md:text-[13px]"
                            >
                              Owner
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => field.onChange("Rider")}
                              className="text-[9px] md:text-[13px]"
                            >
                              Rider
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </div>
                    </DropdownMenu>
                    <FieldError className="text-[8px] tracking-wide md:text-[13px]">
                      {fieldState.error?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                control={form.control}
                name="documents"
                render={({ field, fieldState }) => (
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
                          {role === "Owner"
                            ? `Do you have all the required documents? (PAN Card +
                          Aaadhar Card + Hotel License )`
                            : `Do you have the insurance papers and all documents of the vehicle you own, if yes, then proceed with role request, else dont proceed with request`}
                        </TooltipContent>
                      </Tooltip>
                    </FieldLabel>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={cn(
                        "border-orange-500",
                        fieldState.error?.message && "border-red-500"
                      )}
                    />
                    {fieldState.error?.message && (
                      <FieldError className="w-full text-[8px] tracking-wide md:text-[12px]">
                        Documents required
                      </FieldError>
                    )}
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
    </>
  )
}

export default RoleRequest
