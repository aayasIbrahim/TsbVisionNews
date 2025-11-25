"use client";

import React, { useEffect, useState } from "react";
import CommerceMainCard from "@/components/commerce/CommerceMainCard";
import CommerceStandardCard from "@/components/commerce/CommerceStandardCard";
import SectionHeader from "./ui/SectionHeader";
import { INews } from "@/types/news";

const CommerceSection: React.FC = () => {
  const [news, setNews] = useState<INews[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/news?category=বাণিজ্য");
        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();

        if (data.success && data.data.length > 0) {
          setNews(data.data);
        } else {
          setNews([]);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!news.length) return <p className="text-center py-10">No news found.</p>;

  const mainArticle = news[0];
  const rightArticles = news.slice(1);

  return (
    <section className="bg-white min-h-screen">
      <div className="p-4 sm:p-8 container mx-auto">
        {/* Section Header */}
        <SectionHeader title="বাণিজ্য" />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {/* Left large card */}
          <div className="lg:col-span-2 lg:row-span-2">
            {mainArticle && (
              <CommerceMainCard
                article={{
                  id: mainArticle._id,
                  title: mainArticle.title,
                  image: mainArticle.imageSrc || "/placeholder.png",
                  summary: mainArticle.summary,
                }}
              />
            )}
          </div>

          {/* Right side articles */}
          {rightArticles.map((article) => (
            <div key={article._id} className="lg:col-span-2">
              <CommerceStandardCard
                article={{
                  id: article._id,
                  title: article.title,
                  image: article.imageSrc || "/placeholder.png",
                  summary: article.summary,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommerceSection;
