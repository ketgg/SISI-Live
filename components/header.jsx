import { promises as fs } from "fs"

const Header = async () => {
  const file = await fs.readFile("data/links.json")
  const links = JSON.parse(file)

  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-background font-grotesk-tight py-3 px-[4%] h-[72px] md:h-[84px]">
      <div className="flex justify-between items-start max-w-[1280px] h-full mx-auto font-bold">
        <div className="text-3xl md:text-4xl leading-6 md:leading-[1.75rem]">
          SISI
        </div>
        <a
          href={links.github}
          target="_blank"
          className="text-3xl md:text-4xl leading-6 md:leading-[1.75rem] hover:text-foreground/60 transition-colors"
        >
          GITHUB
        </a>
      </div>
    </header>
  )
}

export default Header
