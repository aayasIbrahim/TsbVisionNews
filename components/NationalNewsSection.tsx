"use client";

import { useEffect, useState } from "react";
import { INews } from "@/types/news";
import MainArticle from "./NationalNews/MainArticle";
import SidebarNewsCard from "./NationalNews/SidebarNewsCard";
import AdCard from "./headlines/AdCard";
import SectionHeader from "./ui/SectionHeader";
import AdvertisementBanner from "./AdvertisementBanner";

export default function NationalNewsSection() {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news?category=জাতীয়");
        const data = await res.json();
        setNews(data.data); // <-- fixed here
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!news.length) return <p>No news found.</p>;

  const [main, ...sidebarNews] = news;

  return (
    <section className="container mx-auto p-4 sm:p-6 font-sans min-h-screen">
      <SectionHeader title="জাতীয়" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainArticle {...main} />
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
            {sidebarNews.map((item) => (
              <SidebarNewsCard key={item._id} {...item} />
            ))}
          </div>
          <AdCard
            ad={{ title: "ঈদ অফার", details: "বিশেষ ছাড়!", imageUrl: "/ads/image.png" }}
          />
        </div>
      </div>
      <AdvertisementBanner />
    </section>
  );
}
