import { Navigate, useLocation, useNavigate } from "react-router-dom"
import SearchCard from "../search/search-card"
import SearchBar, { type SearchForm } from "../search-bar"
import type { Restaurant } from "@/type"
import { useAiFoodSearch } from "@/api/AiApi"

const AiSearchResults = () => {
  const { state } = useLocation()
  const { aiSearch, isLoading } = useAiFoodSearch()
  const navigate = useNavigate()

  if (!state) {
    return <Navigate to={"/"} />
  }

  const query = state?.query as string
  const results = state?.results as Restaurant[]

  if (!aiSearch) {
    return <span>No restaurants found for your request</span>
  }

  const handleAISubmit = async (query: SearchForm) => {
    const searchResults = await aiSearch(query.searchQuery)

    navigate("/ai/food-search", {
      state: {
        query: query.searchQuery,
        results: searchResults,
      },
    })
  }

  if (!results || results.length === 0) {
    return <span>No restaurants found for your request</span>
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full animate-pulse flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo" />
        <span className="text-[9px] md:text-sm">AI searching...</span>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-start justify-center gap-2">
      <div className="mx-auto w-full space-y-2 md:w-[80%]">
        <SearchBar
          placeHolder={query}
          onSubmit={handleAISubmit}
          aiSearch={true}
        />
      </div>
      <div id="main-content" className="flex flex-col items-start gap-5">
        <span className="px-2">
          AI Found{" "}
          {results.length > 1
            ? `${results.length} Restaurants `
            : `${results.length} Restaurant `}
          near you
        </span>
        <div className="grid grid-cols-1 gap-5 px-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {results.map((restaurant, index) => (
            <SearchCard restaurant={restaurant} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AiSearchResults
