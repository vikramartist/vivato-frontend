/* eslint-disable @typescript-eslint/no-unused-vars */
import LoadingButton from "@/components/loading-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import z from "zod"
import DetailsSection from "./details-section"
import { Separator } from "@/components/ui/separator"
import CuisinesSection from "./cuisines-section"
import MenuItem from "./menu-item"
import ImageSection from "./image-section"

const restaurantSchema = z.object({
  restaurantName: z
    .string()
    .min(1, { message: "Restaurant name is required" })
    .max(125, { message: "Restaurant name must be less than 125 characters" }),
  restaurantType: z
    .enum(["veg", "non-veg", "mixed"])
    .describe(
      "Restaurant Type must be either veg or non-veg or mixed and is required"
    ),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(250, { message: "Description should be less than 250 characters" }),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .max(250, { message: "Address should be less than 250 characters" }),
  city: z.string().min(1, { message: "City is required" }),
  contact: z.string().min(1, { message: "Contact is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  zipCode: z.string().min(1, { message: "Zipcode is required" }),
  deliveryPrice: z.coerce.number<number>().nonnegative(),
  estimatedDeliveryTime: z.coerce.number<number>().nonnegative(),
  cuisines: z.array(z.string()).nonempty("Please select at least one item"),
  menuItems: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number<number>().nonnegative(),
        foodType: z
          .enum(["veg", "non-veg"])
          .describe("Food type is required and must be either veg or non-veg")
          .optional(),
        menuImageUrl: z.array(z.string().url()).min(1, {
          message: "Menu Image is required and should have atleast 1 image",
        }),
        calories: z.coerce.number<number>().nonnegative(),
      })
    )
    .min(1, { message: "Atleast one menu is required" }),
  imageUrl: z
    .string()
    .min(1, { message: "Restaurant Image is required" })
    .url("Must be a valid url"),
  openingTime: z.coerce.number<number>().min(0).max(2359),
  closingTime: z.coerce.number<number>().min(0).max(2359),
})

type RestaurantFormData = z.infer<typeof restaurantSchema>

type Props = {
  onSave: (restaurantFormData: RestaurantFormData) => void
  isLoading: boolean
}

const RestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      restaurantType: "veg",
      cuisines: [],
      menuItems: [{ name: "", menuImageUrl: [], foodType: "veg" }],
      imageUrl: "",
    },
  })

  const onSubmit = (formData: RestaurantFormData) => {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-[18px] font-bold md:text-2xl">
          Restaurant Details
        </CardTitle>
        <CardDescription className="text-[12px] tracking-tight md:text-xl">
          Enter the details about your restaurant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DetailsSection />
            <Separator />
            <CuisinesSection />
            <Separator />
            <MenuItem />
            <Separator />
            <ImageSection />
            <div>
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-500 text-[10px] md:text-[14px]"
                >
                  Create Restaurant
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default RestaurantForm
