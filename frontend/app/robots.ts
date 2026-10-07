import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://sudhixai.site/sitemap.xml",
    host: "https://sudhixai.site",
  };
}
