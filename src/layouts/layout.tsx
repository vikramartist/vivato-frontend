import Footer from "@/components/footer"
import Header from "@/components/header"
import Hero from "@/components/hero"

type Props = {
  children: React.ReactNode
  showHero?: boolean
}

const Layout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex min-h-screen flex-col dark:bg-[#0b1220]">
      <Header />
      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
