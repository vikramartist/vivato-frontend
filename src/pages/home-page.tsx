const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="mx-2 -mt-16 flex flex-col gap-5 rounded-lg bg-white py-8 text-center shadow-md dark:bg-[#171f2e]">
        <h1 className="text-[15px] font-bold tracking-tight text-orange-600 md:text-5xl dark:text-white">
          Feel the Flavor — Vivato
        </h1>
        <span className="text-[12px] text-muted-foreground md:text-xl dark:text-white">
          Hungry? Tap Vivato.
        </span>
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
