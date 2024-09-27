const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] text-center font-grotesk-wide px-[4%]">
      <div className="flex items-center">
        <h1 className="inline-block mr-5 pr-6 text-2xl font-medium align-top border-r border-border">
          404
        </h1>
        <div className="inline-block">
          <h2 className="text-sm font-normal">This page could not be found.</h2>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
