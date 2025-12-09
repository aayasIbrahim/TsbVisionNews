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
  const { data, isLoading, error } = useGetNewsQuery({
    category: "বিশ্ব",
    limit: 10,
  });

  if (isLoading) return <FullScreenLoading />;
  if (error) return <p className="text-center p-10 text-red-600">Error loading world news</p>;
  if (!data?.data?.length) return <p className="text-center p-10">No world news found.</p>;

  const news: INews[] = data.data;

  // Safe destructure
  const [
    largeLeft,
    mediumTop1,
    smallRightTop,
    smallRightBottom,
    ...bottomCards
  ] = news;

  // utility mapper
  const mapArticle = (item: INews) => ({
    id: item._id,
    title: item.title,
    summary: item.summary,
    image: item.imageSrc || "/placeholder.png",
  });

  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">

        <SectionHeader title="বিশ্ব" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6 lg:grid-rows-2 lg:h-[650px]">

          {/* LEFT LARGE CARD */}
          <div className="lg:col-span-2 lg:row-span-2">
            {largeLeft && (
              <LargeLeftCard article={mapArticle(largeLeft)} />
            )}
          </div>

          {/* MIDDLE MEDIUM CARD */}
          <div className="lg:col-span-2 lg:row-span-1">
            {mediumTop1 && (
              <MediumCard article={mapArticle(mediumTop1)} />
            )}
          </div>

          {/* RIGHT SMALL CARDS */}
          <div className="lg:col-span-2 lg:row-span-1 flex flex-col gap-4">
            {smallRightTop && (
              <SideSmallCard article={mapArticle(smallRightTop)} />
            )}
            {smallRightBottom && (
              <SideSmallCard article={mapArticle(smallRightBottom)} />
            )}
          </div>

          {/* BOTTOM LIST CARDS */}
          {bottomCards.slice(0, 4).map((item) => (
            <div key={item._id} className="lg:col-span-2 mt-4">
              <BasicCard article={mapArticle(item)} />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WorldSection;
