"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INews } from "@/types/news";
import { useGetNewsQuery } from "@/app/redux/features/news/newsApi";

interface RelatedNewsSectionProps {
  category: string;
  currentNewsId: string;
}

const RelatedNewsSection: React.FC<RelatedNewsSectionProps> = ({
  category,
  currentNewsId,
}) => {
  // Call RTK Query
  const { data, isLoading, isError } = useGetNewsQuery({category, limit: 15});

  // Filter out current news
  const relatedNews: INews[] =
    data?.data?.filter((news) => news._id !== currentNewsId) || [];

  if (isLoading) return <p className="text-center py-6">লোড হচ্ছে...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">ত্রুটি হয়েছে</p>;
  if (!relatedNews.length) return null;

  return (
    <section className="mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">আরও খবর</h2>

        <ul className="space-y-4">
          {relatedNews.map((news) => (
            <li key={news._id}>
              <Link
                href={`/news/${news._id}`}
                className="
                  flex flex-col sm:flex-row items-start sm:items-center 
                  gap-4 p-4 bg-white border border-gray-200 rounded-xl 
                  shadow-sm hover:shadow-lg transition-all duration-200
                "
              >
                {/* Image */}
                <div className="flex-shrink-0 w-full sm:w-32 h-24 sm:h-25 relative rounded-lg overflow-hidden">
                  <Image
                    src={news.imageSrc || "/placeholder.png"}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {news.title}
                  </h3>
                  {news.summary && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {news.summary}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedNewsSection;
