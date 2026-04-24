/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { useGetMyUser } from "@/api/MyUserApi"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

type Props = {
  name: string
  label?: string
}

const UploadMenuWidget = ({ name, label }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const { currentUser } = useGetMyUser()
  const cloudinaryRef = useRef<any>(null)

  const restaurantName = watch("restaurantName")

  // sanitize folder name
  const safeRestaurantName =
    restaurantName?.trim().toLowerCase().replace(/\s+/g, "-") || "temp"

  useEffect(() => {
    if (!window.cloudinary && !currentUser) return
    cloudinaryRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        folder: `vivato/restaurants/${currentUser?._id}/${safeRestaurantName}/restaurantImage`,
      },
      (err: any, res: any) => {
        if (err) {
          return
        }
        if (res.event === "success") {
          const url = res.info.secure_url

          setValue(name, url, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })

          toast.success("Restaurant Image successfully uploaded!")
        }
      }
    )
    return () => {
      cloudinaryRef.current?.destroy?.()
    }
  }, [currentUser])

  const handleUpload = () => {
    cloudinaryRef.current.open()

    cloudinaryRef.current.update({
      folder: `vivato/restaurants/${currentUser?._id}/${safeRestaurantName}/restaurantImage`,
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col items-center justify-center gap-2">
          <Field onClick={handleUpload} className="flex flex-row items-center">
            <Button
              disabled={field.value}
              className="flex-1 text-[9px] md:text-[13px]"
            >
              {label || "Upload Restaurant image"}
            </Button>
            {field.value && (
              <Button
                onClick={() => setValue(name, "")}
                variant={"destructive"}
                className="flex-1 text-[9px] md:text-[13px]"
              >
                Remove
              </Button>
            )}
          </Field>
          {field.value && (
            <Card className="w-full items-center">
              <CardHeader className="w-full">
                <CardTitle className="text-[9px] md:text-[13px]">
                  Preview Restaurant Image
                </CardTitle>
                <CardDescription className="text-[8px] md:text-[12px]">
                  Click on 'X' to remove the image.
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <img src={field.value} alt={"Menu Image"} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    />
  )
}

export default UploadMenuWidget
