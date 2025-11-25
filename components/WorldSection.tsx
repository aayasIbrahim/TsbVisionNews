"use client";

import React, { useEffect, useState } from "react";
import BasicCard from "@/components/world/BasicCard";
import SideSmallCard from "@/components/world/SideSmallCard";
import MediumCard from "@/components/world/MediumCard";
import LargeLeftCard from "@/components/world/LargeLeftCard";
import SectionHeader from "./ui/SectionHeader";
import { INews } from "@/types/news";

const WorldSection: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorldNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news?category=বিশ্ব");
        const data = await res.json();

        if (data.success) {
          setNews(data.data);
        }
      } catch (error) {
        console.error("World API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorldNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!news.length) return <p className="text-center py-10">No World News Found.</p>;

  // ------- Article Structure -------
  const [
    largeLeft,       // Big Left Card
    mediumTop1,      // Medium Card Top
    smallRightTop,   // Small Right 1
    smallRightBottom, // Small Right 2
    ...bottomCards    // BasicCards bottom list
  ] = news;

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <SectionHeader title="বিশ্ব" />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2 lg:h-[650px]">
          
          {/* TOP LEFT LARGE CARD */}
          <div className="lg:col-span-2 lg:row-span-2">
            {largeLeft && (
              <LargeLeftCard
                article={{
                  id: largeLeft._id,
                  title: largeLeft.title,
                  summary: largeLeft.summary,
                  image: largeLeft.imageSrc || "/placeholder.png",
                }}
              />
            )}
          </div>

          {/* TOP MIDDLE MEDIUM CARD */}
          <div className="lg:col-span-2 lg:row-span-1">
            {mediumTop1 && (
              <MediumCard
                article={{
                  id: mediumTop1._id,
                  title: mediumTop1.title,
                  summary: mediumTop1.summary,
                  image: mediumTop1.imageSrc || "/placeholder.png",
                }}
              />
            )}
          </div>

          {/* TOP RIGHT TWO SMALL CARDS */}
          <div className="lg:col-span-2 lg:row-span-1 flex flex-col gap-4">
            {smallRightTop && (
              <SideSmallCard
                article={{
                  id: smallRightTop._id,
                  title: smallRightTop.title,
                  image: smallRightTop.imageSrc || "/placeholder.png",
                }}
              />
            )}

            {smallRightBottom && (
              <SideSmallCard
                article={{
                  id: smallRightBottom._id,
                  title: smallRightBottom.title,
                  image: smallRightBottom.imageSrc || "/placeholder.png",
                }}
              />
            )}
          </div>

          {/* BOTTOM BASIC CARDS */}
          {bottomCards.slice(0, 3).map((article) => (
            <div key={article._id} className="lg:col-span-2 mt-5">
              <BasicCard
                article={{
                  id: article._id,
                  title: article.title,
                  summary: article.summary,
                  image: article.imageSrc || "/placeholder.png",
                }}
              />
            </div>
          ))}

          {/* LAST CARD */}
          {bottomCards[3] && (
            <div className="lg:col-span-2">
              <BasicCard
                article={{
                  id: bottomCards[3]._id,
                  title: bottomCards[3].title,
                  summary: bottomCards[3].summary,
                  image: bottomCards[3].imageSrc || "/placeholder.png",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorldSection;
