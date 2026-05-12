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
import { useEffect, useMemo, useState } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import { GeoJSON } from "react-leaflet"

type Props = {
  restaurantId?: string
  restaurants?: Restaurant[]
  className: string
}

type UserLocation = {
  lat: number
  lng: number
}

const MapPage = ({ restaurantId, restaurants, className }: Props) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)

  const [routeGeometry, setRouteGeometry] = useState<any>(null)
  const { getRestaurantDirection, isLoading } = useGetRestaurantRoute()
  const { restaurant } = useGetRestaurantById(restaurantId)

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getUserLocation()

      setUserLocation({ lat: location.latitude, lng: location.longitude })
    }

    fetchLocation()
  }, [])

  useEffect(() => {
    if (!restaurant || !userLocation) return
    const fetchGeometry = async () => {
      const { lat: restaurantLat, lng: restaurantLng } = getLatLng(
        restaurant.location?.coordinates as [number, number]
      )
      const geometryData = await getRestaurantDirection({
        source: { lat: userLocation.lat, lng: userLocation.lng },
        target: { lat: restaurantLat, lng: restaurantLng },
      })

      setRouteGeometry(geometryData.geometry)
    }

    fetchGeometry()
  }, [restaurant, userLocation])

  const routeStyle = {
    color: "blue",
    weight: 5,
    opacity: 1,
  }

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

    return <GeoJSON data={routeGeometry} style={routeStyle} />
  }, [routeGeometry])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Getting the direction...</span>
      </div>
    )
  }

  return (
    <MapContainer
      zoomControl
      zoom={9}
      className={className}
      center={centerValue as LatLngExpression}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
  )
}

export default MapPage
