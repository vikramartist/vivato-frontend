import { useSearchRestaurants } from "@/api/RestaurantApi"
import SearchBar, { type SearchForm } from "@/components/search-bar"
import PaginationSelector from "@/components/search/pagination-selector"
import SearchCard from "@/components/search/search-card"
import SearchInfo from "@/components/search/search-info"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
  searchQuery: string
  page: number
}

const SearchPage = () => {
  const { city } = useParams()
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
  })
  const { data, isLoading } = useSearchRestaurants(searchState, city)

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">Searching...</span>
      </div>
    )
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }))
  }

  const setPage = (page: number) => {
    setSearchState((prevState) => ({ ...prevState, page }))
  }

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }))
  }

  if (!data || !city) {
    return <span>No Results found!</span>
  }

  return (
    <div className="grid grid-cols-1 gap-5 px-2 lg:grid-cols-[250px_1fr]">
      <div id="cuisines-list">Insert cuisines here:)</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search By Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <SearchInfo city={city} total={data.pagination.total} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-2">
          {data.data.map((restaurant, index) => (
            <SearchCard restaurant={restaurant} key={index} />
          ))}
        </div>
        <PaginationSelector
          page={data.pagination.page}
          pages={data.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

export default SearchPage
