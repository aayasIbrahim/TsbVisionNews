// components/CommerceStandardCard.tsx
import React from 'react';
import Image from 'next/image';
interface Article {
  id: number | string;
  title: string;
  image: string;
  summary?: string; // For the large left card
}

interface CommerceStandardCardProps {
  article: Article;
}

const CommerceStandardCard: React.FC<CommerceStandardCardProps> = ({ article }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition duration-200">
      {/* Image */}
      <div className="relative w-full h-32 sm:h-40 flex-shrink-0">
        <Image fill src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Title */}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {article.title}
        </h3>
      </div>
    </div>
  );
};

export default CommerceStandardCard;