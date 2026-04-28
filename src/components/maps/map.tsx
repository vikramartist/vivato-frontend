import type { Restaurant } from "@/type"
import { Icon, type LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "../ui/button"
import MarkerClusterGroup from "react-leaflet-cluster"
import { hhmmToMinutes } from "@/lib/utils"
import { Verified } from "lucide-react"
import FlyToLocation from "./fly-to-location"

type Map = {
  restaurants: Restaurant[]
  className: string
  location: LatLngExpression | null
  onSelect?: (restaurant: Restaurant) => void
}

const POSITION = [12.9716, 77.5946]

const Map = ({ restaurants, className, location, onSelect }: Map) => {
  const customIcon = new Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [38, 38],
  })

  return (
    <MapContainer
      zoomControl
      zoom={15}
      className={className}
      center={POSITION as LatLngExpression}
    >
      <FlyToLocation location={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {restaurants.map((restaurantCoordinates) => (
          <Marker
            key={`${restaurantCoordinates._id}-${restaurantCoordinates.restaurantName}`}
            position={[
              restaurantCoordinates?.location?.coordinates![1] as number,
              restaurantCoordinates?.location?.coordinates![0] as number,
            ]}
            icon={customIcon}
          >
            <Popup>
              <div className="w-40">
                <img
                  src={restaurantCoordinates.imageUrl}
                  alt={restaurantCoordinates.restaurantName}
                  className="h-20 w-full rounded-md object-cover"
                  loading="lazy"
                />
                <div className="mt-1 flex h-full w-full flex-col items-center justify-center text-[9px] md:text-sm">
                  <div className="flex w-full items-center justify-between">
                    <Button
                      variant={"link"}
                      className="text-[9px] font-normal text-black md:text-[10px]"
                      onClick={() => onSelect!(restaurantCoordinates)}
                    >
                      {restaurantCoordinates.restaurantName}
                    </Button>
                    <span className="text-[8px] md:text-[10px]">
                      {hhmmToMinutes(restaurantCoordinates.openingTime)} -{" "}
                      {hhmmToMinutes(restaurantCoordinates.closingTime)}
                    </span>
                    <span className="text-[8px] md:text-[10px]">
                      <Verified size={"8px"} />
                      {restaurantCoordinates.restaurantType}
                    </span>
                  </div>

                  <p className="text-[8px] font-normal tracking-tight md:text-[10px]">
                    {restaurantCoordinates.description.substring(0, 100)}...
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

export default Map
