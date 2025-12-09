// components/MostReadItemComponent.tsx
import React from "react";
import { MostReadItem } from "@/components/BangladeshSection";
import Link from "next/link";
import Image from "next/image";

interface MostReadItemProps {
  item: MostReadItem;
}

const MostReadItemComponent: React.FC<MostReadItemProps> = ({ item }) => {
  return (
    <Link href={`news/${item.id}`} >
      <div className="flex items-center gap-6 p-3 bg-white border-b border-gray-200 hover:bg-gray-50 transition duration-150 cursor-pointer last:border-b-0">
        <div className="flex-shrink-0  rounded-md overflow-hidden">
          <Image
            src={item.authorImage}
            alt="Author"
            className="object-cover"
            height={100}
            width={100}
            sizes="64px"
          />
        </div>
        <p className="text-gray-900 text-sm font-medium leading-snug">
          {item.title}
        </p>
      </div>
    </Link>
  );
};

export default MostReadItemComponent;
