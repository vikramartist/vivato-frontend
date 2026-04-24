import { CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { numberToTimeString, timeStringToNumber } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"

const TimingSection = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-[13px] font-bold md:text-xl">Restaurant Timings</h2>
        <CardDescription className="text-[10px] md:text-sm">
          Update the Opening and Closing time of the restaurant, the same will
          be displayed to the users.
        </CardDescription>
      </div>
      <FieldGroup>
        <Controller
          name="openingTime"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex w-32 flex-col items-start gap-2">
              <span className="text-[9px] md:text-sm">Opening Time</span>
              <Input
                type="time"
                step="1"
                className="appearance-none placeholder:text-[9px] md:placeholder:text-[13px]"
                value={numberToTimeString(field.value)}
                onChange={(e) =>
                  field.onChange(timeStringToNumber(e.target.value))
                }
              />
              <FieldError className="text-[9px] md:text-[13px]">
                {fieldState.error?.message}
              </FieldError>
            </Field>
          )}
        />
        <Controller
          name="closingTime"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex w-32 flex-col items-start gap-2">
              <span className="text-[9px] md:text-sm">Closing Time</span>
              <Input
                type="time"
                step="1"
                className="appearance-none placeholder:text-[9px] md:placeholder:text-[13px]"
                value={numberToTimeString(field.value)}
                onChange={(e) =>
                  field.onChange(timeStringToNumber(e.target.value))
                }
              />
              <FieldError className="text-[9px] md:text-[13px]">
                {fieldState.error?.message}
              </FieldError>
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  )
}

export default TimingSection
