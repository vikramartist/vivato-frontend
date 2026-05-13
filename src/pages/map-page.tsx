/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useGetRestaurantById,
  useGetRestaurantRoute,
} from "@/api/RestaurantApi"
import FlyToLocation from "@/components/maps/fly-to-location"
import MapMarker from "@/components/maps/map-marker"
import { getLatLng, getUserLocation } from "@/lib/utils"
import type { Restaurant } from "@/type"
import { Icon, type LatLngExpression } from "leaflet"
import { useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { GeoJSON } from "react-leaflet"
import { useTheme } from "@/components/theme-provider"

type Props = {
  restaurantId?: string
  restaurants?: Restaurant[]
  className: string
}

export type UserLocation = {
  lat: number
  lng: number
}

const MapPage = ({ restaurantId, restaurants, className }: Props) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 })

  const [routeGeometry, setRouteGeometry] = useState<any>(null)
  const { getRestaurantDirection, isLoading } = useGetRestaurantRoute()
  const { restaurant } = useGetRestaurantById(restaurantId)

  const darkTiles =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"

  const lightTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const { theme } = useTheme()

  const isDark = theme === "dark"
  const fetchedRef = useRef(false)

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation()

      setUserLocation({
        lat: Number(location.latitude.toFixed(4)),
        lng: Number(location.longitude.toFixed(4)),
      })
    }

    fetchLocation()
  }, [])

  useEffect(() => {
    if (!restaurant || !userLocation || fetchedRef.current) return

    fetchedRef.current = true
    const fetchGeometry = async () => {
      const { lat: restaurantLat, lng: restaurantLng } = getLatLng(
        restaurant.location?.coordinates as [number, number]
      )
      const geometryData = await getRestaurantDirection({
        source: { lat: userLocation.lat, lng: userLocation.lng },
        target: { lat: restaurantLat, lng: restaurantLng },
      })
      setRouteGeometry(geometryData.geometry)
      setRouteInfo({
        distance: geometryData.distance,
        duration: geometryData.duration,
      })
    }

    fetchGeometry()
  }, [restaurant, userLocation])

  const lightRouteStyle = {
    color: "blue",
    weight: 3,
    opacity: 1,
  }

  const darkRouteStyle = {
    color: "white",
    weight: 3,
    opacity: 1,
  }

  const formattedDistance = `${(routeInfo.distance / 1000).toFixed(2)} km`

  const formattedDuration = `${Math.ceil(routeInfo.duration / 60)} mins`

  const userIcon = useMemo(
    () =>
      new Icon({
        iconUrl: "/marker-icon.png",
        iconSize: [38, 38],
      }),
    []
  )

  const centerValue = useMemo(() => {
    if (restaurantId && restaurant?.location?.coordinates) {
      return getLatLng(restaurant.location.coordinates as [number, number])
    } else if (!restaurantId && restaurants?.length && restaurants) {
      return getLatLng(restaurants[0].location?.coordinates as [number, number])
    }
    return userLocation || [12.9716, 77.5946]
  }, [restaurant, restaurantId, restaurants, userLocation])

  const routeLayer = useMemo(() => {
    if (!routeGeometry) return null

    return (
      <GeoJSON
        data={routeGeometry}
        style={isDark ? darkRouteStyle : lightRouteStyle}
      />
    )
  }, [routeGeometry, isDark])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Getting the direction...</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <MapContainer
        zoomControl
        zoom={9}
        className={className}
        center={centerValue as LatLngExpression}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={isDark ? darkTiles : lightTiles}
        />

        {restaurantId && restaurant?.location?.coordinates ? (
          <FlyToLocation
            location={getLatLng(restaurant.location.coordinates)}
            zoomLevel={15}
          />
        ) : !restaurantId && restaurants && restaurants?.length ? (
          <FlyToLocation
            location={getLatLng(
              restaurants.at(0)?.location?.coordinates as [number, number]
            )}
            zoomLevel={12}
          />
        ) : userLocation ? (
          <FlyToLocation location={userLocation!} zoomLevel={12} />
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
        {routeLayer}
      </MapContainer>
      {routeInfo.distance > 0 && (
        <div className="absolute top-5 right-2 z-5000 flex h-fit flex-col gap-2 rounded-md bg-background/90 px-4 py-2 text-orange-800 shadow-md dark:bg-gray-700 dark:text-white">
          <p className="w-full rounded-md border px-2 text-[10px] md:text-sm">
            Distance: {formattedDistance}
          </p>
          <p className="rounded-md border px-2 text-[10px] md:text-sm">
            ETA: {formattedDuration}
          </p>
        </div>
      )}
    </div>
  )
}

export default MapPage
