const Hero = () => {
  return (
    <div className="bg-orange-400 dark:bg-[#0b1220]">
      <img
        src={"/hero.png"}
        alt="Hero"
        className="mx-auto max-h-150 w-auto object-center dark:hidden"
      />
      <img
        src={"/hero-dark.png"}
        alt="Hero"
        className="mx-auto hidden max-h-150 w-auto object-center dark:block"
      />
    </div>
  )
}

export default Hero
