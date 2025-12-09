"use client";

import React from "react";
import LeftStackedCard from "../components/sports/LeftStackedCard";
import MainCenterSportsCard from "../components/sports/MainCenterSportsCard";
import RightSmallHorizontalCard from "../components/sports/RightSmallHorizontalCard";
import SectionHeader from "./ui/SectionHeader";
import FullScreenLoading from "./ui/FullScreenLoading";
import { useGetNewsQuery } from "@/app/redux/features/news/newsApi";


const SportsSection: React.FC = () => {
  const { data, isLoading, error } = useGetNewsQuery({
    category: "খেলা",
    limit: 10,
  });
  const news=data?.data||[];

  if (!news.length) return null;
 if (error) return <p className="text-center py-10 text-red-400">Failed to load news.</p>;
  // Distribute Layout Sections
  const leftTwo = news.slice(0, 2);         // Left 2 articles
  const centerMain = news[2];               // Center main article
  const rightSmall = news.slice(3);         // Remaining right column

  return (
    <section className="bg-white">
      <div className="p-4 sm:p-8 container mx-auto">
        
        <SectionHeader title="খেলা" />
  {isLoading && <FullScreenLoading/>}
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
