"use client";

import React, { useEffect, useState } from "react";
import LeftStackedCard from "../components/sports/LeftStackedCard";
import MainCenterSportsCard from "../components/sports/MainCenterSportsCard";
import RightSmallHorizontalCard from "../components/sports/RightSmallHorizontalCard";
import SectionHeader from "./ui/SectionHeader";
import { INews } from "@/types/news";

const SportsSection: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSportsNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news?category=খেলা");
        const data = await res.json();

        if (data.success) {
          setNews(data.data);
        }
      } catch (err) {
        console.error("Sports API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading sports news...</p>;
  if (!news.length) return <p className="text-center py-10">No sports news found.</p>;

  // Distribute Layout Sections
  const leftTwo = news.slice(0, 2);         // Left 2 articles
  const centerMain = news[2];               // Center main article
  const rightSmall = news.slice(3);         // Remaining right column

  return (
    <section className="bg-white">
      <div className="p-4 sm:p-8 container mx-auto">
        
        <SectionHeader title="খেলা" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* LEFT COLUMN — 2 stacked cards */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {leftTwo.map((article) => (
              <LeftStackedCard
                key={article._id}
                article={{
                  id: article._id,
                  title: article.title,
                  summary: article.summary,
                  image: article.imageSrc || "/placeholder.png",
                }}
              />
            ))}
          </div>

          {/* CENTER MAIN ARTICLE */}
          <div className="lg:col-span-6">
            {centerMain && (
              <MainCenterSportsCard
                article={{
                  id: centerMain._id,
                  title: centerMain.title,
                  image: centerMain.imageSrc || "/placeholder.png",
                  summary: centerMain.summary,
                }}
              />
            )}
          </div>

          {/* RIGHT SMALL NEWS LIST */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {rightSmall.map((article, index) => (
                <div
                  key={article._id}
                  className={index < rightSmall.length - 1 ? "border-b border-gray-100" : ""}
                >
                  <RightSmallHorizontalCard
                    article={{
                      id: article._id,
                      title: article.title,
                      summary: article.summary,
                      image: article.imageSrc || "/placeholder.png",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SportsSection;
