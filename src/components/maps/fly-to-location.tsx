import type { LatLngExpression } from "leaflet"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

const FlyToLocation = ({ location }: { location: LatLngExpression | null }) => {
  const map = useMap()

  useEffect(() => {
    if (!location) return

    if (!map || !map.getCenter()) return
    if (location) {
      map.flyTo(location, 18, { duration: 1.5 })
    }
  }, [location, map])

  return null
}

export default FlyToLocation
