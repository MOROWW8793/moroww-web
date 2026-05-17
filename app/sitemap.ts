import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.moroww.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.moroww.com/collectie", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: "https://www.moroww.com/collectie/nosso-knokke", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/ann-helena-ursel", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/moroww-oostende", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/collectie/cozy-relax-beernem", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.moroww.com/over-moroww", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/eigenaar-worden", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://www.moroww.com/partners", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
