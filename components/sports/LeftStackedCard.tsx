// components/LeftStackedCard.tsx
import React from 'react';
import { Article } from '@/components/SportsSection'; // Adjust path

interface LeftStackedCardProps {
  article: Article;
}

const LeftStackedCard: React.FC<LeftStackedCardProps> = ({ article }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-[500px] flex flex-col hover:bg-gray-50 transition duration-150 cursor-pointer">
      <div className="relative w-full  flex-shrink-0">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3 flex-grow">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {article.title}
        </h3>
        {article.summary && (
          <p className="text-gray-600 text-sm mt-1 leading-tight">
            {article.summary}
          </p>
        )}
      </div>
    </div>
  );
};

export default LeftStackedCard;