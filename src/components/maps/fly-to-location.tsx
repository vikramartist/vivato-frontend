import type { LatLngExpression } from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

const FlyToLocation = ({
  location,
  zoomLevel = 18,
}: {
  location: LatLngExpression | null
  zoomLevel?: number
}) => {
  const map = useMap()

  useEffect(() => {
    if (!location) return

    if (!map || !map.getCenter()) return
    if (location) {
      map.flyTo(location, zoomLevel, { duration: 1.5 })
    }
  }, [location, map])

  return null
}

export default FlyToLocation
