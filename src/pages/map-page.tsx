import { useGetMyUser } from "@/api/MyUserApi"
import { useGetRestaurantById } from "@/api/RestaurantApi"
import FlyToLocation from "@/components/maps/fly-to-location"
import { Button } from "@/components/ui/button"
import { getLatLng, hhmmToMinutes } from "@/lib/utils"
import type { Restaurant } from "@/type"
import { Icon } from "leaflet"
import { Verified } from "lucide-react"
import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { useNavigate } from "react-router-dom"

type Props = {
  restaurantId?: string
  restaurants: Restaurant[]
  className: string
}

const MapPage = ({ restaurantId, restaurants, className }: Props) => {
  const { currentUser } = useGetMyUser()
  const navigate = useNavigate()

  const iconCache = new Map<string, Icon>()

  const getCustomUrl = (image: string): Icon => {
    if (!iconCache.has(image)) {
      iconCache.set(
        image,
        new Icon({
          iconUrl: image,
          iconSize: [38, 38],
          className: "rounded-full ",
        })
      )
    }
    return iconCache.get(image)!
  }

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

  return (
    <MapContainer
      zoomControl
      zoom={7}
      className={className}
      center={userLocation || [12.9716, 77.5946]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation location={userLocation} zoomLevel={9} />

      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup interactive>
            <p className="text-[9px] md:text-sm">You are here!</p>
          </Popup>
        </Marker>
      )}
      {restaurantId && (
        <Marker
          key={`${currentUser?._id}`}
          position={getLatLng(
            restaurant?.location?.coordinates as [number, number]
          )}
          icon={getCustomUrl(restaurant?.imageUrl as string)}
        />
      )}
      <MarkerClusterGroup chunkedLoading>
        {restaurants.map((restaurant) => (
          <Marker
            key={`${restaurant._id}-${restaurant.restaurantName}`}
            position={[
              restaurant?.location?.coordinates![1] as number,
              restaurant?.location?.coordinates![0] as number,
            ]}
            icon={getCustomUrl(restaurant.imageUrl)}
          >
            <Popup>
              <div className="w-40">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.restaurantName}
                  className="h-20 w-full rounded-md object-cover"
                  loading="lazy"
                />
                <div className="mt-1 flex h-full w-full flex-col items-center justify-center text-[9px] md:text-sm">
                  <Button
                    variant={"link"}
                    className="text-[9px] font-normal text-black md:text-[10px]"
                    onClick={() => navigate(`/details/${restaurant._id}`)}
                  >
                    {restaurant.restaurantName}
                  </Button>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[8px] md:text-[10px]">
                      Timings: {hhmmToMinutes(restaurant.openingTime)} -{" "}
                      {hhmmToMinutes(restaurant.closingTime)}
                    </span>
                    <span className="text-[8px] md:text-[10px]">
                      <Verified size={"8px"} />
                      {restaurant.restaurantType}
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[10px]">
                    Rating: {4 / 5}
                  </span>
                  <p className="text-[8px] font-normal tracking-tight md:text-[10px]">
                    {restaurant.description.substring(0, 100)}...
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapPage
