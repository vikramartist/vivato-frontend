import { cuisines, foodTypes } from "@/config/restaurant-options-config"
import { Button } from "../ui/button"
import { type ChangeEvent } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  selectedFoodType: FoodType | undefined
  isExpanded: boolean
  onExpandedClick: () => void
  onFoodTypeChange: (foodType: FoodType) => void
}

export type FoodType = "veg" | "non-veg" | "mixed"

const SearchFilter = ({
  isExpanded,
  onChange,
  onExpandedClick,
  selectedCuisines,
  selectedFoodType,
  onFoodTypeChange,
}: Props) => {
  const handleCuisinesReset = () => {
    onFoodTypeChange("veg")
    onChange([])
  }

  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value
    const isChecked = event.target.checked

    const newCuisinesList = isChecked
      ? [...selectedCuisines!, clickedCuisine]
      : selectedCuisines?.filter((cuisine) => cuisine !== clickedCuisine)

    onChange(newCuisinesList!)
  }

  const handleFoodTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const foodType = event.target.value
    const isChecked = event.target.checked

    const newFoodType = isChecked ? (foodType as FoodType) : "veg"

    onFoodTypeChange(newFoodType!)
  }

  return (
    <>
      <div className="flex items-center justify-between px-2">
        <div className="mb-2 text-[9px] font-semibold md:text-sm">Filter</div>
        <div
          onClick={handleCuisinesReset}
          className="mb-2 cursor-pointer text-[9px] font-semibold text-blue-500 underline md:text-sm"
        >
          Reset
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col items-start gap-2">
          <span className="text-[9px] font-semibold md:text-sm">FoodType</span>
          <div className="flex gap-2">
            {foodTypes.map((foodType, index) => {
              const isSelected = selectedFoodType === foodType
              return (
                <div className="flex" key={index + 1}>
                  <Input
                    id={`foodType${foodType}`}
                    type="checkbox"
                    className="hidden"
                    value={foodType}
                    checked={isSelected}
                    onChange={handleFoodTypeChange}
                  />
                  <Label
                    htmlFor={`foodType${foodType}`}
                    className={cn(
                      `flex flex-1 cursor-pointer items-center rounded-full px-4 py-2 text-[8px] font-semibold md:text-[12px]`,
                      isSelected
                        ? "border border-green-600 text-green-600"
                        : "border border-slate-300"
                    )}
                  >
                    {isSelected && <Check strokeWidth={2.5} size={15} />}
                    {foodType}
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 space-y-2">
          <span className="text-[9px] font-semibold md:text-sm">Cuisines</span>
          <div className="flex w-auto flex-row flex-wrap gap-2">
            {cuisines
              .slice(0, isExpanded ? cuisines.length : 10)
              .map((cuisine, index) => {
                const isSelected = selectedCuisines?.includes(cuisine)

                return (
                  <div className="flex" key={index + 1}>
                    <Input
                      id={`cuisine_${cuisine}`}
                      type="checkbox"
                      className="hidden"
                      value={cuisine}
                      checked={isSelected}
                      onChange={handleCuisinesChange}
                    />
                    <Label
                      htmlFor={`cuisine_${cuisine}`}
                      className={cn(
                        `flex flex-1 cursor-pointer items-center rounded-full px-4 py-2 text-[8px] font-semibold md:text-[12px]`,
                        isSelected
                          ? "border border-green-600 text-green-600"
                          : "border border-slate-300"
                      )}
                    >
                      {isSelected && <Check strokeWidth={2.5} size={15} />}
                      {cuisine}
                    </Label>
                  </div>
                )
              })}
          </div>
          <Button
            variant={"link"}
            onClick={onExpandedClick}
            className="flex-1 text-[9px] md:text-sm"
          >
            {isExpanded ? (
              <span className="flex flex-row items-center">
                View Less <ChevronUp />
              </span>
            ) : (
              <span className="flex flex-row items-center">
                View More <ChevronDown />
              </span>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}

export default SearchFilter
