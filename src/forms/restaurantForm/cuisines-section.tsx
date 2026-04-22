import { CardDescription } from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { cuisineList } from "@/config/restaurant-options-config"
import { Controller, useFormContext } from "react-hook-form"
import CuisineCheckBox from "./cuisine-check-box"
import { useEffect } from "react"

const CuisinesSection = () => {
  const { control, watch, setValue } = useFormContext()

  const restaurantType = watch("restaurantType")

  useEffect(() => {
    setValue("cuisines", [])
  }, [restaurantType, setValue])
  const cuisines =
    restaurantType === "veg"
      ? cuisineList[0]["veg"]!
      : restaurantType === "non-veg"
        ? cuisineList[1]["non-veg"]!
        : cuisineList[2]["mixed"]!

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-[13px] font-bold md:text-xl">Cuisines</h2>
        <CardDescription className="text-[10px] md:text-sm">
          Select the cuisine that your restaurant serves
        </CardDescription>
      </div>
      <FieldGroup>
        <Controller
          name="cuisines"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="grid grid-cols-2 gap-1 md:grid-cols-5">
              {cuisines.map((cuisineItem) => (
                <CuisineCheckBox
                  key={cuisineItem}
                  cuisine={cuisineItem}
                  field={field}
                />
              ))}
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

export default CuisinesSection
