// components/MainCenterSportsCard.tsx
import React from 'react';
import { Article } from '@/components/SportsSection'; 

interface MainCenterSportsCardProps {
  article: Article;
}

const MainCenterSportsCard: React.FC<MainCenterSportsCardProps> = ({ article }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden h-[50%] shadow-md">
      <img src={article.image} alt={article.title} className="w-full h-[400px] object-cover" />
      
      {/* Title Overlay for better contrast on the dark image */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
        <h3 className="text-black text-xl font-bold leading-tight">
          {article.title}
        </h3>
      </div>
    </div>
  );
};

export default MainCenterSportsCard;