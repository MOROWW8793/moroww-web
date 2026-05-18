import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Nederlands (default, no prefix) ──
    { url: "https://www.moroww.com",                                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: "https://www.moroww.com/collectie",                          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://www.moroww.com/collectie/nosso-knokke",             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/ann-helena-ursel",         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/moroww-oostende",          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/cozy-relax-beernem",       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/over-moroww",                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/eigenaar-worden",                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/partners",                           lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://www.moroww.com/contact",                            lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: "https://www.moroww.com/vergelijking",                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // ── English (/en prefix) ──
    { url: "https://www.moroww.com/en",                                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: "https://www.moroww.com/en/collection",                      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: "https://www.moroww.com/en/collection/nosso-knokke",         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/en/collection/ann-helena-ursel",     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/en/collection/moroww-oostende",      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/en/collection/cozy-relax-beernem",   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/en/about",                           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/en/become-an-owner",                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/en/partners",                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://www.moroww.com/en/contact",                         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.4 },
    { url: "https://www.moroww.com/en/vergelijking",                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
}
