import UploadWidget from "@/components/cloudinary/upload-widget"
import { CardDescription } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useFormContext } from "react-hook-form"

const ImageSection = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-[13px] font-bold md:text-xl">Image</h2>
        <CardDescription className="text-[10px] md:text-sm">
          Add an Image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </CardDescription>
      </div>
      <FieldGroup className="flex w-full flex-col gap-8 md:w-[30%]">
        <Controller
          name="imageUrl"
          control={control}
          render={({ fieldState }) => (
            <Field className="flex flex-col items-end gap-2">
              <FieldLabel className="text-[9px] md:text-sm">
                Menu Image(s)
              </FieldLabel>
              <UploadWidget name={"imageUrl"} label="Upload Restaurant Image" />
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

export default ImageSection
