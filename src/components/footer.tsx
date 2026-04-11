const Footer = () => {
  return (
    <div className="bg-orange-500 py-10 dark:bg-[#171f2e]">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <span className="text-[12px] font-bold tracking-tight text-white md:text-3xl">
          Vivato
        </span>
        <span className="flex gap-4 text-[12px] font-bold tracking-tight text-white md:text-sm">
          <span>Privacy Policy</span>
          <span>Terms of service</span>
        </span>
      </div>
    </div>
  )
}

export default Footer
