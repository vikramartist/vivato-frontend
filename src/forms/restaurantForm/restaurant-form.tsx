/* eslint-disable react-hooks/exhaustive-deps */
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
import TimingSection from "./timing-section"
import type { Restaurant } from "@/type"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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
  openingTime: z.coerce.number<number>().min(0),
  closingTime: z.coerce.number<number>().min(0),
})

type RestaurantFormData = z.infer<typeof restaurantSchema>

type Props = {
  onSave: (restaurantFormData: Restaurant) => void
  isLoading: boolean
  restaurant?: Restaurant
}

const RestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      restaurantType: "veg",
      cuisines: [""],
      menuItems: [
        {
          name: "",
          menuImageUrl: [],
          foodType: "veg",
          calories: 0,
          price: 0,
        },
      ],
      imageUrl: "",
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!restaurant) return

    const defaultMenuItem: RestaurantFormData["menuItems"][number] = {
      name: "",
      price: 0,
      calories: 0,
      foodType: "veg",
      menuImageUrl: [],
    }

    const mappedMenuItems = restaurant.menuItems?.length
      ? restaurant.menuItems.map((item) => ({
          name: item.name ?? "",
          price: item.price ?? 0,
          calories: item.calories ?? 0,
          foodType:
            item.foodType === "veg" || item.foodType === "non-veg"
              ? (item.foodType as "veg" | "non-veg")
              : "veg",
          menuImageUrl: Array.isArray(item.menuImageUrl)
            ? item.menuImageUrl
            : [],
        }))
      : [defaultMenuItem]

    form.reset({
      restaurantName: restaurant.restaurantName ?? "",
      restaurantType: restaurant.restaurantType ?? "veg",
      description: restaurant.description ?? "",
      address: restaurant.address,
      city: restaurant.city ?? "",
      contact: restaurant.contact ?? "",
      country: restaurant.country ?? "",
      zipCode: restaurant.zipCode ?? "",
      deliveryPrice: restaurant.deliveryPrice ?? 0,
      estimatedDeliveryTime: restaurant.estimatedDeliveryTime ?? 0,
      cuisines: restaurant.cuisines ?? [""],
      imageUrl: restaurant.imageUrl ?? "",
      openingTime: restaurant.openingTime ?? 0,
      closingTime: restaurant.closingTime ?? 0,
      menuItems: mappedMenuItems,
    })
  }, [restaurant])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Loading</span>
      </div>
    )
  }

  const onSubmit = (restaurantData: RestaurantFormData) => {
    onSave(restaurantData)
    navigate("/my-restaurants")
  }

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
            <ImageSection label="Menu Image" />
            <Separator />
            <TimingSection />
            <div>
              {isLoading ? (
                <LoadingButton />
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-orange-500 text-[10px] md:text-[14px]"
                >
                  {restaurant ? "Update " : "Create "} Restaurant
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
