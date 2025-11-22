// components/SmallCard.tsx
import React from "react";
import Image  from "next/image";

interface Article {
  title: string;
  image: string;
}

interface SmallCardProps {
  article: Article;
  isRightAligned?: boolean;
}

const SmallCard: React.FC<SmallCardProps> = ({ article, isRightAligned = false }) => {
  const { title, image } = article;

  const alignment = isRightAligned ? "flex-row-reverse" : "flex-row";

  return (
    <div
      className={`bg-gray-800 h-28 flex ${alignment} items-center gap-2 overflow-hidden`}
    >
      {/* Image Container */}
      <div className="flex-shrink-0 w-28 h-full overflow-hidden">
        <Image
        width={233}
        height={233}
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="p-2">
        <h3 className="text-sm font-semibold text-white line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default SmallCard;
