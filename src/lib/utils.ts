import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const timeStringToNumber = (value: string | undefined) => {
  if (!value) return undefined

  const [hours, minutes] = value.split(":").map(Number)
  return hours * 100 + minutes
}

export const numberToTimeString = (value: number | undefined) => {
  if (value === undefined) return ""

  const hours = Math.floor(value / 100)
  const minutes = value % 100

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}
