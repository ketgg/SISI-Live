import { promises as fs } from "fs"

const Footer = async () => {
  const file = await fs.readFile("data/links.json")
  const links = JSON.parse(file)

  return (
    <footer className="w-full bg-background font-grotesk-wide py-2 px-[4%]">
      <div className="flex justify-center items-end max-w-[1280px] h-full mx-auto text-border text-sm md:text-base leading-[0.875rem] md:leading-4">
        <div>
          Crafted with{" "}
          <svg
            className="inline fill-border hover:fill-pink transition-colors"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.39 20.87a.696.696 0 0 1-.78 0C9.764 19.637 2 14.15 2 8.973c0-6.68 7.85-7.75 10-3.25 2.15-4.5 10-3.43 10 3.25 0 5.178-7.764 10.664-9.61 11.895z" />
          </svg>{" "}
          by{" "}
          <a
            className="font-bold hover:text-foreground transition-colors"
            href={links["x.com"]}
            target="_blank"
          >
            @ketto.gg
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
