import { Link } from "react-router-dom"

type Props = {
  total: number
  city: string
}

const SearchInfo = ({ city, total }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-3 text-xl font-bold lg:flex-row lg:items-center">
      <span className="text-[9px] tracking-wider md:text-[13px]">
        {total} Restaurants found in {city}
        <Link
          to={"/"}
          className="ml-1 cursor-pointer text-sm text-[9px] font-semibold tracking-wide text-blue-500 underline md:text-[13px]"
        >
          Change Location
        </Link>
      </span>
    </div>
  )
}

export default SearchInfo
