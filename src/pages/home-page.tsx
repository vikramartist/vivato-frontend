import { useGetMyUser } from "@/api/MyUserApi"
import { useSearchRestaurants } from "@/api/RestaurantApi"
import RestaurantsHome from "@/components/restaurants-home"
import SearchBar, { type SearchForm } from "@/components/search-bar"
import { Skeleton } from "@/components/ui/skeleton"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  const { currentUser } = useGetMyUser()
  const { data, isLoading } = useSearchRestaurants(
    {
      searchQuery: "",
      page: 1,
      selectedCuisines: [],
      foodType: "veg",
      sortOption: "bestMatch",
    },
    currentUser?.city ?? "Bengaluru"
  )

  const handleSearchSubmit = (searchForm: SearchForm) => {
    navigate({ pathname: `search/${searchForm.searchQuery}` })
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="mx-2 -mt-40 flex flex-col gap-5 rounded-lg bg-white py-8 text-center shadow-md dark:bg-[#171f2e]">
        <h1 className="text-[15px] font-bold tracking-tight text-orange-600 md:text-5xl dark:text-white">
          Feel the Flavor — Vivato
        </h1>
        <span className="text-[12px] text-muted-foreground md:text-xl dark:text-white">
          Hungry? Tap Vivato.
        </span>
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="mx-auto flex h-fit w-[95%] flex-col items-center gap-2 md:container">
        <span className="w-full self-start px-2 text-[10px] md:text-[15px]">
          Restaurants in your city
        </span>
        {isLoading ? (
          <div className="mx-auto mb-2 flex h-54 w-full gap-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-30 w-30 cursor-pointer shadow md:h-50 md:w-50"
              ></Skeleton>
            ))}
          </div>
        ) : (
          <div className="mx-auto mb-2 no-scrollbar flex h-54 w-full gap-3 overflow-x-scroll px-1">
            {data?.data.map((restaurant, index) => (
              <RestaurantsHome
                key={index}
                restaurant={restaurant}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <img src="/landing.png" alt="landing" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-[18px] font-bold tracking-tighter md:text-3xl">
            Order takeaway even faster!
          </span>
          <span className="text-[12px] md:text-sm">
            Download the Vivato App for faster ordering and personalized
            recommendations
          </span>
          <img src="/appDownload.png" alt="Download" />
        </div>
      </div>
    </div>
  )
}

export default HomePage
