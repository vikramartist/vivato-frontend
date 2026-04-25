import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import MenuitemInput from "./menu-item-input"

const MenuItem = () => {
  const { control } = useFormContext()

  const { append, fields, remove } = useFieldArray({
    control,
    name: "menuItems",
  })

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-[13px] font-bold md:text-xl">Menu</h2>
        <CardDescription className="text-[10px] md:text-sm">
          Create your menu here, and give each item name, price and image
        </CardDescription>
      </div>
      <FieldGroup>
        <Controller
          control={control}
          name="menuItems"
          render={() => (
            <>
              {fields.map((_, index) => (
                <MenuitemInput
                  key={index}
                  index={index}
                  removeMenuItems={() => remove(index)}
                />
              ))}
            </>
          )}
        />
      </FieldGroup>
      <Button
        type="button"
        onClick={() =>
          append({
            name: "",
            price: "",
            menuImageUrl: [],
            calories: "",
            foodtype: "veg",
          })
        }
        className="text-[9px] md:text-[14px]"
      >
        Add Menu
      </Button>
    </div>
  )
}

export default MenuItem
