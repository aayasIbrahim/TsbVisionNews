// pages/SportsSection.tsx (or components/SportsSection.tsx)
import React from "react";
import LeftStackedCard from "../components/sports/LeftStackedCard";
import MainCenterSportsCard from "../components/sports/MainCenterSportsCard";
import RightSmallHorizontalCard from "../components/sports/RightSmallHorizontalCard";
import SectionHeader from "./ui/SectionHeader";
// Assuming the data is now imported from a separate file for better maintainability
// src/data/sportsData.ts
// Dummy Data (Mocked content)
export const DUMMY_DATA_LEFT: Article[] = [
  {
    id: "l1",
    title: "অনূর্ধ্ব-১৭ বিশ্বকাপ জিতল ডোমিনিয়ান গার্লস",
    image: "/nation/image (5).png",
    summary: "প্রথমবারের মতো এই টুর্নামেন্ট জিতেছে ডোমিনিকান রিপাবলিক",
  },
  {
    id: "l2",
    title: "দুই ফরম্যাটেই সিরিজ জয় বাংলাদেশের",
    image: "/nation/image (5).png",
    summary: "বাংলাদেশ সহজে আইরিশদের হারিয়ে সিরিজে ২-০ ব্যবধানে এগিয়ে।",
  },
];

export const DUMMY_DATA_CENTER: Article = {
  id: "c1",
  title: 'ভারত "এ" দলের বিরুদ্ধে বল টেম্পারিংয়ের অভিযোগ, পরে মুক্তি ভারত "এ" দলের বিরুদ্ধে বল টেম্পারিংয়ের অভিযোগ, পরে মুক্তি ভারত "এ" দলের বিরুদ্ধে বল টেম্পারিংয়ের অভিযোগ, পরে মুক্তি ',
  image: "/nation/image (5).png",
};

export const DUMMY_DATA_RIGHT: SmallArticle[] = [
  {
    id: "r1",
    title: 'কোচিংয়ে এসে বিশ্বসেরার স্বপ্ন দেখছে এই ফুটবল "আইডল" মার্সেলো',
    image: "/nation/image (5).png",
  },
  {
    id: "r2",
    title: "প্লে-অফ কাপে গোল করে দুর্দান্ত ইব্রাহিমকে হারালেন লিভারপুল",
    image: "/nation/image (5).png",
  },
 
];

// Interfaces remain here for component definition integrity
export interface Article {
  id: number | string;
  title: string;
  image: string;
  summary?: string;
}

export interface SmallArticle extends Article {
  authorName?: string;
}

const SportsSection: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="p-4 sm:p-8 container mx-auto">
        
        {/* Section Header: Added link props for a more complete component */}
        <SectionHeader 
            title=" খেলা"
        />

        {/* --- MAIN LAYOUT GRID (FIXED TO 12 COLUMNS: 3 | 6 | 3) --- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* 📍 LEFT STACK (3/12) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {DUMMY_DATA_LEFT.map((article) => (
              <LeftStackedCard key={article.id} article={article} />
            ))}
          </div>

          {/* 📍 CENTER MAIN ARTICLE (6/12 - Increased from 5/12 for balance) */}
          <div className="lg:col-span-6"> 
            <MainCenterSportsCard article={DUMMY_DATA_CENTER} />
          </div>

          {/* 📍 RIGHT SMALL ARTICLES (3/12 - Used remaining space) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {DUMMY_DATA_RIGHT.map((article, index) => (
                <div 
                  key={article.id} 
                  // Added border-b to all except the last item for visual separation
                  className={index < DUMMY_DATA_RIGHT.length - 1 ? "border-b border-gray-100" : ""}
                >
                  <RightSmallHorizontalCard article={article} />
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