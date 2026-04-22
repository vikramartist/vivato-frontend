import UploadWidget from "@/components/cloudinary/upload-widget"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useFormContext } from "react-hook-form"

type Props = {
  index: number
  removeMenuItems: () => void
}

const MenuitemInput = ({ index, removeMenuItems }: Props) => {
  const { control, watch } = useFormContext()

  const type = watch("restaurantType")

  const placeholder =
    type === "veg"
      ? "South Veg Thali"!
      : type === "non-veg"
        ? "Non-veg Thali"!
        : "veg + non-veg combo"!
  return (
    <FieldGroup className="flex flex-col items-end gap-2 md:flex-row">
      <Controller
        name={`menuItems.${index}.name`}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-col items-end gap-2">
            <FieldLabel className="text-[9px] md:text-sm">Name</FieldLabel>
            <Input
              {...field}
              placeholder={placeholder}
              className="bg-white placeholder:text-[10px] md:placeholder:text-[12px]"
              value={field.value}
              onChange={field.onChange}
            />
            <FieldError className="text-[9px] tracking-wide md:text-[13px]">
              {fieldState.error?.message}
            </FieldError>
          </Field>
        )}
      />
      <Controller
        name={`menuItems.${index}.price`}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-col items-end gap-2">
            <FieldLabel className="text-[9px] md:text-sm">
              Price (Rs)
            </FieldLabel>
            <Input
              {...field}
              placeholder="57.00"
              className="bg-white placeholder:text-[10px] md:placeholder:text-[12px]"
              value={field.value}
              onChange={field.onChange}
            />
            <FieldError className="text-[8px] tracking-wide md:text-[13px]">
              {fieldState.error?.message}
            </FieldError>
          </Field>
        )}
      />

      <Field className="flex flex-col items-end gap-2">
        <FieldLabel className="text-[9px] md:text-sm">Menu Image(s)</FieldLabel>
        <UploadWidget
          name={`menuItems.${index}.menuImageUrl`}
          multiple={true}
          label="Upload Menu Images"
        />
      </Field>
      <Controller
        name={`menuItems.${index}.calories`}
        control={control}
        render={({ field, fieldState }) => (
          <Field className="flex flex-col items-end gap-2">
            <FieldLabel className="text-[9px] md:text-sm">Calories</FieldLabel>
            <Input
              {...field}
              placeholder="250.00 (between: 0 - 1000)"
              className="bg-white placeholder:text-[10px] md:placeholder:text-[12px]"
              value={field.value}
              onChange={field.onChange}
            />
            <FieldError className="text-[8px] tracking-wide md:text-[13px]">
              {fieldState.error?.message}
            </FieldError>
          </Field>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItems}
        className="bg-red-500 text-[9px] md:text-[13px] dark:text-white"
      >
        Remove
      </Button>
    </FieldGroup>
  )
}

export default MenuitemInput
