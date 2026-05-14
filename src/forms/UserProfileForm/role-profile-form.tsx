/* eslint-disable react-hooks/incompatible-library */
import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn, getUserLocation } from "@/lib/utils"
import type { Rider, VehicleType, Weekdays } from "@/type"
import { useAuth0 } from "@auth0/auth0-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LucideBike, LucideScooter, PlugZap } from "lucide-react"
import { useEffect } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
  riderId: z.string().optional(),
  vehicleType: z.enum(["Bike", "Scooter", "EV-Bike", "EV-Scooter"], {
    message: "Vehicle type is required",
  }),
  experience: z.coerce.number<number>().nonnegative(),
  isAvailable: z.boolean().optional(),
  vehicleNumber: z
    .string()
    .transform((value) => value.toUpperCase().replace(/\s+/g, ""))
    .refine((val) => /^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/.test(val), {
      message: "Invalid vehicle number",
    }),
  drivingLicenseNumber: z
    .string()
    .transform((val) => val.toUpperCase().replace(/\s+/g, ""))
    .refine((val) => /^[A-Z]{2}\d{2}\d{4}\d{7}$/.test(val), {
      message: "Invalid driving license number",
    }),
  deliveryRadiusKm: z
    .number()
    .min(1, "Minimum radius is 1km")
    .max(40, "Maximum radius is 40km"),
  workHours: z.object({
    start: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time"),
    end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time"),
  }),
  workingDays: z
    .array(
      z.enum([
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ])
    )
    .min(3, "Select atleast 3 working days"),
  currentLocation: z
    .object({ coordinates: z.object({ lng: z.number(), lat: z.number() }) })
    .optional(),
})

type RoleFormData = z.infer<typeof formSchema>

const vehicleTypes = [
  {
    value: "Bike",
    label: "bike",
    image: LucideBike,
    isElectric: false,
  },
  {
    value: "Scooter",
    label: "scooter",
    image: LucideScooter,
    isElectric: false,
  },
  {
    value: "EV-Bike",
    label: "ev-bike",
    image: LucideBike,
    isElectric: true,
  },
  {
    value: "EV-Scooter",
    label: "ev-scooter",
    image: LucideScooter,
    isElectric: true,
  },
]

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

type Props = {
  onSave: (roleProfileData: RoleFormData) => void
  isLoading: boolean
  currentRider?: Rider
  title?: string
  buttonText?: string
  userName?: string
}

const RoleProfileForm = ({
  isLoading,
  buttonText,
  userName,
  onSave,
  currentRider,
}: Props) => {
  const form = useForm<RoleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { deliveryRadiusKm: 5 },
  })
  const { isAuthenticated } = useAuth0()

  const radius = form.watch("deliveryRadiusKm")

  useEffect(() => {
    if (!currentRider) return

    form.reset({
      riderId: currentRider.riderId ?? "",
      isAvailable: currentRider.isAvailable,
      experience: currentRider.experience,
      vehicleNumber: currentRider.vehicleNumber,
      vehicleType: currentRider.vehicleType,
      drivingLicenseNumber: currentRider.drivingLicenseNumber,
      workingDays: currentRider.workingDays ?? [],
      workHours: currentRider.workHours,
      deliveryRadiusKm: currentRider.deliveryRadiusKm,
    })
  }, [currentRider])

  const onSubmit = async (riderProfile: RoleFormData) => {
    if (!isAuthenticated) return

    const { latitude, longitude } = await getUserLocation()

    const payload = {
      ...riderProfile,
      currentLocation: {
        coordinates: { lat: latitude, lng: longitude },
      },
    }

    console.log(payload)
    onSave(payload)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-[18px] font-bold md:text-2xl">
          Rider Profile Details
        </CardTitle>
        <CardDescription className="text-[12px] tracking-tight md:text-xl">
          Update your ride details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="flex flex-row items-center justify-between gap-3">
              <Controller
                name="riderId"
                control={form.control}
                render={({ field }) => (
                  <Field className="w-[50%]">
                    <FieldLabel className="text-[10px] md:text-sm">
                      Rider Name
                    </FieldLabel>
                    <Input
                      {...field}
                      disabled
                      className="bg-white text-[9px] md:text-sm"
                      value={userName}
                    />
                  </Field>
                )}
              />
              <Controller
                name="experience"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex w-[30%]">
                    <FieldLabel className="text-[10px] md:text-sm">
                      Experience
                    </FieldLabel>
                    <Input
                      {...field}
                      className="bg-white text-[9px] md:text-sm"
                      value={field.value}
                      placeholder="Enter your experience in yrs"
                      onChange={(value) => field.onChange(value)}
                    />
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-row flex-wrap items-center justify-between gap-3">
              <Controller
                name="vehicleType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex md:w-[40%]">
                    <FieldLabel className="text-[10px] md:text-sm">
                      Select your Vehicle Type
                    </FieldLabel>
                    <div className="flex items-center gap-2">
                      {vehicleTypes.map(
                        ({ image: Icon, isElectric, label, value }) => {
                          const isSelected =
                            field.value === (value as VehicleType)
                          return (
                            <div
                              key={label}
                              className={cn(
                                "relative flex cursor-pointer flex-col items-center rounded-xl border px-2 py-1",
                                isSelected
                                  ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                                  : "bg-gray-200 hover:border-orange-300 dark:bg-gray-500"
                              )}
                              onClick={() => {
                                form.setValue(
                                  "vehicleType",
                                  value as VehicleType,
                                  {
                                    shouldDirty: true,
                                    shouldTouch: true,
                                    shouldValidate: true,
                                  }
                                )
                              }}
                            >
                              <Icon className="h-9 w-9 md:h-18 md:w-18" />
                              {isElectric && (
                                <div className="absolute top-1 left-1">
                                  <PlugZap className="h-3.5 w-3.5 text-orange-500 md:h-5.5 md:w-5.5" />
                                </div>
                              )}
                              <span className="text-[9px] tracking-tight md:text-sm">
                                {label}
                              </span>
                            </div>
                          )
                        }
                      )}
                    </div>
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
              <div className="flex w-full items-center justify-between gap-2 md:w-[40%]">
                <Controller
                  name="vehicleNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="flex md:w-[50%]">
                      <FieldLabel className="text-[10px] md:text-sm">
                        Vehicle Number
                      </FieldLabel>
                      <Input
                        {...field}
                        className="bg-white text-[9px] md:text-sm"
                        value={field.value}
                        placeholder="Enter your vehicle number"
                        onChange={(value) => field.onChange(value)}
                      />
                      {fieldState.error?.message && (
                        <FieldError
                          className="text-[9px] md:text-sm"
                          {...field}
                          aria-invalid
                        >
                          {fieldState.error.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="drivingLicenseNumber"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="flex md:w-[50%]">
                      <FieldLabel className="text-[10px] md:text-sm">
                        Driving License Number
                      </FieldLabel>
                      <Input
                        {...field}
                        className="bg-white text-[9px] md:text-sm"
                        value={field.value}
                        placeholder="Enter your license number"
                        onChange={(value) => field.onChange(value)}
                      />
                      {fieldState.error?.message && (
                        <FieldError
                          className="text-[9px] md:text-sm"
                          {...field}
                          aria-invalid
                        >
                          {fieldState.error.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
            <FieldGroup className="flex w-[50%] items-center justify-between md:flex-row">
              <FieldLabel className="text-[10px] md:text-sm">
                Work Hours
              </FieldLabel>
              <Controller
                name={`workHours.start`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1 md:w-[50%]">
                    <FieldLabel className="text-[9px] md:text-[13px]">
                      Start time
                    </FieldLabel>
                    <Input
                      {...field}
                      type="time"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="text-[9px] md:text-sm"
                    />
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`workHours.end`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1 md:w-[50%]">
                    <FieldLabel className="text-[9px] md:text-[13px]">
                      End time
                    </FieldLabel>
                    <Input
                      {...field}
                      type="time"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      className="text-[9px] md:text-sm"
                    />
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex w-full items-center gap-2">
              <Controller
                name="workingDays"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="">
                    <FieldLabel className="text-[10px] md:text-sm">
                      Working Days
                    </FieldLabel>
                    <div className="flex flex-row flex-wrap items-center gap-4">
                      {weekDays.map((day) => {
                        const checked = field.value?.includes(day as Weekdays)
                        return (
                          <div key={day} className="flex items-center gap-2">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(isChecked) => {
                                if (isChecked) {
                                  field.onChange([...(field.value || []), day])
                                } else {
                                  field.onChange(
                                    field.value?.filter(
                                      (value) => value !== day
                                    )
                                  )
                                }
                              }}
                            />
                            <span className="text-[9px] md:text-sm">{day}</span>
                          </div>
                        )
                      })}
                    </div>
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
                      </FieldError>
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex md:w-[60%]">
              <Controller
                name="deliveryRadiusKm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-[9px] md:text-sm">
                        Delivery Radius
                      </FieldLabel>

                      <span className="text-[10px] font-semibold text-orange-500 md:text-sm">
                        {radius ?? field.value} km
                      </span>
                    </div>
                    <Input
                      type="range"
                      {...field}
                      min={0}
                      max={40}
                      step={1}
                      value={field.value ?? radius}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[8px] text-muted-foreground md:text-[10px]">
                      <span>1 km</span>
                      <span>40 km</span>
                    </div>
                    {fieldState.error?.message && (
                      <FieldError
                        className="text-[9px] md:text-sm"
                        {...field}
                        aria-invalid
                      >
                        {fieldState.error.message}
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
                <Button
                  type="submit"
                  className="bg-orange-500 text-[10px] md:text-sm"
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default RoleProfileForm
