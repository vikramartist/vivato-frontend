import { useGetRestaurantById } from "@/api/RestaurantApi"
import FlyToLocation from "@/components/maps/fly-to-location"
import MapMarker from "@/components/maps/map-marker"
import { getLatLng } from "@/lib/utils"
import type { Restaurant } from "@/type"
import { Icon } from "leaflet"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"

type Props = {
  restaurantId?: string
  restaurants?: Restaurant[]
  className: string
}

const MapPage = ({ restaurantId, restaurants, className }: Props) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  )

  useEffect(() => {
    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
      },
      (error) => {
        console.log("error getting location...", error)
      }
    )
  }, [])

  const userIcon = new Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [38, 38],
  })

  const { restaurant } = useGetRestaurantById(restaurantId)

  let centerValue: [number, number] = [12.9716, 77.5946] //fallback

  if (restaurantId && restaurant?.location?.coordinates) {
    centerValue = getLatLng(restaurant.location.coordinates as [number, number])
  } else if (!restaurantId && restaurants?.length && restaurants) {
    centerValue = getLatLng(
      restaurants[0].location?.coordinates as [number, number]
    )
  } else if (userLocation) {
    centerValue = userLocation
  }

  return (
    <MapContainer
      zoomControl
      zoom={7}
      className={className}
      center={centerValue}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {restaurantId && restaurant?.location?.coordinates ? (
        <FlyToLocation
          location={getLatLng(restaurant.location.coordinates)}
          zoomLevel={18}
        />
      ) : !restaurantId && restaurants && restaurants?.length ? (
        <FlyToLocation
          location={getLatLng(
            restaurants[0].location?.coordinates as [number, number]
          )}
          zoomLevel={9}
        />
      ) : userLocation ? (
        <FlyToLocation location={userLocation} zoomLevel={7} />
      ) : null}

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup interactive>
            <p className="text-[9px] md:text-sm">You are here!</p>
          </Popup>
        </Marker>
      )}
      <MarkerClusterGroup chunkedLoading>
        {restaurantId
          ? restaurant && <MapMarker restaurant={restaurant!} />
          : restaurants?.map((restaurant) => (
              <MapMarker restaurant={restaurant} key={restaurant._id} />
            ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapPage
