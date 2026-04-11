import { z } from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useAuth0 } from "@auth0/auth0-react"
import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import type { User } from "@/type"
import { useEffect } from "react"

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  addressLine1: z
    .string()
    .min(1, "AddressLine1 is required")
    .max(250, "Addressline1 cannot exceed 250 characters"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  profile_pic: z.string().url("Invalid Image URL").optional(),
})

type UserFormData = z.infer<typeof formSchema>

type Props = {
  onSave: (userprofileData: UserFormData) => void
  isLoading: boolean
  currentUser: User
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
  const { user } = useAuth0()
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  })

  useEffect(() => {
    form.reset(currentUser)
  }, [currentUser, form])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-[18px] font-bold md:text-2xl">
          User Profile
        </CardTitle>
        <CardDescription className="text-[12px] tracking-tight md:text-xl">
          View and change your profile information here
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
          <FieldGroup className="flex flex-row items-center justify-between gap-3">
            <Controller
              name="email"
              control={form.control}
              render={({ field }) => (
                <Field className="w-[50%]">
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    disabled
                    className="bg-white"
                    value={user?.email}
                  />
                </Field>
              )}
            />
            <Controller
              name="profile_pic"
              control={form.control}
              render={() => (
                <Field className="flex w-[30%]">
                  <div className="w-full place-items-center items-center space-y-3">
                    <img
                      src={user?.picture}
                      alt={user?.profile}
                      className="h-18 w-18 rounded-full"
                    />
                    <FieldLabel className="text-center">Profile</FieldLabel>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input {...field} className="bg-white" />
                  <FieldDescription>Enter your name</FieldDescription>
                  {fieldState.error?.message && (
                    <FieldError {...field} aria-invalid>
                      Name is required
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="addressLine1"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>AddressLine1</FieldLabel>
                  <Input {...field} className="bg-white" />
                  <FieldDescription>Enter your address</FieldDescription>
                  {fieldState.error?.message && (
                    <FieldError {...field} aria-invalid>
                      Address is required
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup className="flex flex-col items-center gap-4 md:flex-row">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input {...field} className="bg-white" />
                  <FieldDescription>Enter your city</FieldDescription>
                  {fieldState.error?.message && (
                    <FieldError {...field} aria-invalid>
                      City is required
                    </FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Input {...field} className="bg-white" />
                  <FieldDescription>Enter your country</FieldDescription>
                  {fieldState.error?.message && (
                    <FieldError {...field} aria-invalid>
                      Country is required
                    </FieldError>
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div>
            {isLoading ? (
              <LoadingButton />
            ) : (
              <Button type="submit" className="bg-orange-500">
                Submit
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default UserProfileForm
