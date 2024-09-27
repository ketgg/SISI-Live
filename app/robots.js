const robots = () => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: "https://sisi.ketto.space/sitemap.xml",
  }
}

export default robots
