"use client";

import Image from "next/image";
import { INews } from "@/types/news"; // Import your INews type

interface SmallNewsCardProps {
  news: INews;
  isTop?: boolean;
}

const SmallNewsCard = ({ news, isTop = false }: SmallNewsCardProps) => {
  return (
    <div className="border-r border-gray-500">
      <div
        className={`p-4 border-b me-3 hover:bg-gray-50 transition ${
          isTop ? "pt-0" : ""
        }`}
      >
        {/* Image */}
        <Image
          src={news.imageSrc} // INews এর imageSrc ব্যবহার
          alt={news.title}
          width={264}
          height={168}
          className="w-full h-40 object-cover"
        />

        {/* Title */}
        <h2 className="text-lg font-semibold mt-2 hover:text-red-600 cursor-pointer line-clamp-2">
          {news.title}
        </h2>

        {/* Summary */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {news.summary}
        </p>
      </div>
    </div>
  );
};

export default SmallNewsCard;
