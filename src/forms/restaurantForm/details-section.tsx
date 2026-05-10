import { useFormContext } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Controller } from "react-hook-form"

const DetailsSection = () => {
  const { control } = useFormContext()

  return (
    <>
      <FieldGroup className="flex flex-row items-center justify-between gap-3">
        <Controller
          name="restaurantName"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel className="text-[10px] md:text-[14px]">
                Name
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your restaurant name"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Name is required
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="flex flex-row items-center justify-between gap-5">
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] md:text-[14px]">
                Description
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your restaurant description"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Description is required
                </FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="contact"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] md:text-[14px]">
                Contact
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your contact here"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Contact is required
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="flex flex-row items-center justify-between gap-5">
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className="text-[10px] md:text-[14px]">
                Address
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your restaurant address"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Address is required
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="flex flex-col items-center justify-between gap-5 md:flex-row">
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel className="text-[10px] md:text-[14px]">
                City
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your city"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  City is required
                </FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel className="text-[10px] md:text-[14px]">
                Country
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your country"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Country is required
                </FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="zipCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="flex-1">
              <FieldLabel className="text-[9px] md:text-[13px]">
                ZipCode
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px]"
                placeholder="Enter your zipcode"
                value={field.value}
                onChange={field.onChange}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  Zipcode is required
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="flex flex-col items-center gap-5 md:flex-row">
        <Controller
          name="deliveryPrice"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="w-full md:max-w-[25%]">
              <FieldLabel className="text-[9px] md:text-[13px]">
                DeliveryPrice (Rs)
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px] md:placeholder:text-[14px]"
                placeholder="30"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />
        <Controller
          name="estimatedDeliveryTime"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="w-full md:max-w-[25%]">
              <FieldLabel className="text-[10px] md:text-[14px]">
                Estimated Delivery Time (minutes)
              </FieldLabel>
              <Input
                {...field}
                className="bg-white placeholder:text-[9px] md:text-[14px] md:placeholder:text-[14px]"
                placeholder="30"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup className="flex flex-row items-center gap-5">
        <Controller
          name="restaurantType"
          control={control}
          render={({ field, fieldState }) => (
            <Field className="m:w-[18%] w-full">
              <FieldLabel className="text-[10px] md:text-[13px]">
                Restaurant Type
              </FieldLabel>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="w-fit"
              >
                <Field orientation={"horizontal"} className="ori">
                  <RadioGroupItem value="veg" id="res-type-veg" />
                  <FieldContent>
                    <FieldLabel
                      className="text-[10px] md:text-[12px]"
                      htmlFor="desc-r1-veg"
                    >
                      Veg
                    </FieldLabel>
                    <FieldDescription className="text-[9px] md:text-[12px]">
                      Your restaurant is pure vegetarian
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Field orientation={"horizontal"}>
                  <RadioGroupItem value="non-veg" id="res-type-non-veg" />
                  <FieldContent>
                    <FieldLabel
                      htmlFor="desc-r1-non-veg"
                      className="text-[10px] md:text-[14px]"
                    >
                      Non-veg
                    </FieldLabel>
                    <FieldDescription className="text-[9px] md:text-[13px]">
                      Your restaurant is Non vegetarian
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Field orientation={"horizontal"}>
                  <RadioGroupItem value="mixed" id="res-type-mixed" />
                  <FieldContent>
                    <FieldLabel
                      htmlFor="desc-r1-mixed"
                      className="text-[10px] md:text-[14px]"
                    >
                      Mixed
                    </FieldLabel>
                    <FieldDescription className="text-[9px] md:text-[13px]">
                      Your restaurant is mixed (Veg + Non-veg)
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </RadioGroup>
              {fieldState.error?.message && (
                <FieldError
                  className="text-[9px] tracking-wide md:text-[13px]"
                  {...field}
                  aria-invalid
                >
                  {fieldState.error.message}
                </FieldError>
              )}
            </Field>
          )}
        />
      </FieldGroup>
    </>
  )
}
export default DetailsSection
