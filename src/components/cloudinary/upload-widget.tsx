/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Field } from "../ui/field"
import { Button } from "../ui/button"
import { useGetMyUser } from "@/api/MyUserApi"
import ImagePreview from "./image-preview"
import { toast } from "sonner"

type Props = {
  name: string
  multiple?: boolean
  label?: string
}

const UploadWidget = ({ name, label, multiple = false }: Props) => {
  const { control, watch, getValues, setValue } = useFormContext()
  const { currentUser } = useGetMyUser()
  const cloudinaryRef = useRef<any>(null)

  const restaurantName = watch("restaurantName")
  const images = watch(name)

  // sanitize folder name
  const safeRestaurantName =
    restaurantName?.trim().toLowerCase().replace(/\s+/g, "-") || "temp"

  useEffect(() => {
    if (!window.cloudinary && !currentUser) return
    cloudinaryRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple,
        folder: `vivato/restaurants/${currentUser?._id}/${safeRestaurantName}/menuImages`,
      },
      (err: any, res: any) => {
        if (err) {
          return
        }

        if (res.event === "success") {
          const url = res.info.secure_url

          const currentValue = getValues(name)

          if (currentValue.length > 5) {
            toast.warning("Only a max of 5 images can be added per menu item.")
            return null
          }

          if (multiple) {
            setValue(name, [...currentValue, url])
          } else {
            setValue(name, [...currentValue, url])
          }
          toast.success(
            `Menu Image${multiple ? "(s)" : ""} uploaded successfully`
          )
        }
      }
    )
  }, [multiple, currentUser])

  const handleUpload = () => {
    cloudinaryRef.current.open()

    cloudinaryRef.current.update({
      folder: `vivato/restaurants/${currentUser?._id}/${safeRestaurantName}/${multiple ? "menuImages" : "restaurantImage"}`,
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="flex flex-row items-center justify-center gap-2">
          <Field onClick={handleUpload}>
            <Button className="text-[9px] md:text-[13px]">
              {label || "Upload Menu image"}
            </Button>
          </Field>
          {images && images.length > 0 && <ImagePreview images={images} />}
        </div>
      )}
    />
  )
}

export default UploadWidget
