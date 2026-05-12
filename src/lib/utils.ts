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

export const hhmmToMinutes = (time: number) => {
  const hrs = Math.floor(time / 100)
  const mins = time % 100
  return minutesToHHMM(hrs * 60 + mins)
}

const minutesToHHMM = (minutes: number) => {
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`
}

export const getLatLng = (
  coords: [number, number]
): { lat: number; lng: number } => {
  return { lat: coords[1], lng: coords[0] }
}

export const getUserLocation = async () => {
  const postition = await new Promise<GeolocationPosition>((resolve, error) => {
    navigator.geolocation.getCurrentPosition(resolve, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  })

  return {
    latitude: postition.coords.latitude,
    longitude: postition.coords.longitude,
  }
}

export const getDistanceInKm = (
  userLat: number,
  userLng: number,
  targetLat: number,
  targetLng: number
) => {
  const R = 6371 // Earth radius in km

  const dLat = ((targetLat - userLat) * Math.PI) / 180
  const dLng = ((targetLng - userLng) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((userLat * Math.PI) / 180) *
      Math.cos((targetLat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
