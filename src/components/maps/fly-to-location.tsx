import { useEffect } from "react"
import { useMap } from "react-leaflet"

const FlyToLocation = ({
  location,
  zoomLevel = 18,
}: {
  location: { lat: number; lng: number }
  zoomLevel?: number
}) => {
  const map = useMap()

  useEffect(() => {
    if (!location) return

    if (!map || !map.getCenter()) return
    if (location) {
      map.flyTo([location?.lat, location?.lng], zoomLevel, { duration: 10 })
    }
  }, [location?.lat, location?.lng, zoomLevel])

  return null
}

export default FlyToLocation
