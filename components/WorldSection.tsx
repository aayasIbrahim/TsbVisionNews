"use client";

import React from "react";
import BasicCard from "@/components/world/BasicCard";
import SideSmallCard from "@/components/world/SideSmallCard";
import MediumCard from "@/components/world/MediumCard";
import LargeLeftCard from "@/components/world/LargeLeftCard";
import SectionHeader from "./ui/SectionHeader";
import { useGetNewsQuery } from "@/app/redux/features/news/newsApi";
import FullScreenLoading from "./ui/FullScreenLoading";
import { INews } from "@/types/news";

const WorldSection: React.FC = () => {
  const { data, isLoading, error } = useGetNewsQuery("বিশ্ব")

  
  if (error) return <p className="text-center p-10 text-red-600">Error loading national news</p>;
  if (!data || !data.data.length) return <p className="text-center p-10">No national news found.</p>;
 const news: INews[] = data.data;
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
            {isLoading && <FullScreenLoading/>}
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
