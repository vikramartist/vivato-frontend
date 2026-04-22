import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Controller,
  useFormContext,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form"

type Props = {
  cuisine: string
  field: ControllerRenderProps<FieldValues, "cuisines">
}

const CuisineCheckBox = ({ cuisine, field }: Props) => {
  const { control } = useFormContext()
  return (
    <FieldGroup>
      <Controller
        name="cuisines"
        control={control}
        render={() => (
          <Field orientation={"horizontal"}>
            <Checkbox
              className="bg-white"
              checked={field.value.includes(cuisine)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...field.value, cuisine])
                } else {
                  field.onChange(
                    field.value.filter((value: string) => value !== cuisine)
                  )
                }
              }}
            />
            <FieldLabel className="text-[9px] font-normal tracking-wide md:text-[13px]">
              {cuisine}
            </FieldLabel>
          </Field>
        )}
      />
    </FieldGroup>
  )
}

export default CuisineCheckBox
