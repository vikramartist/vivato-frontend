import Logo from "./logo"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"

const Header = () => {
  return (
    <div className="border-b-2 border-orange-500 py-6 dark:border-b-[#111827] dark:bg-[#0b1220]">
      <div className="container mx-auto flex items-center justify-between px-2">
        <Logo />
        <div className="flex items-center gap-2 px-2 md:hidden">
          <ModeToggle />
          <MobileNav />
        </div>
        <div className="hidden gap-2 px-2 md:block">
          <MainNav />
        </div>
      </div>
    </div>
  )
}

export default Header
