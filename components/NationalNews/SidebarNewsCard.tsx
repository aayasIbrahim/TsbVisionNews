"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface SidebarNewsCardProps {
  _id: string;           // news _id
  title: string;
  imageSrc: string;
  Icon?: LucideIcon;     // Optional icon
}

const SidebarNewsCard: React.FC<SidebarNewsCardProps> = ({ _id, title, imageSrc, Icon }) => (
  <Link
    href={`/news/${_id}`} // use the prop _id, not News._id
    className="flex items-center space-x-4 p-3 hover:bg-gray-50 transition duration-150 rounded-lg cursor-pointer"
  >
    <Image
      src={imageSrc}
      alt={title}
      height={100}
      width={100}
      className="w-24 h-16 object-cover rounded-md flex-shrink-0"
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.onerror = null;
        target.src = "https://placehold.co/100x70/ccc/000?text=News";
      }}
    />
    <div className="flex-grow flex items-center">
      {Icon && <Icon className="w-4 h-4 text-red-500 mr-2" />}
      <p className="font-solaiman font-normal text-[18px] leading-[1.2] tracking-normal line-clamp-2 hover:text-blue-600">
        {title}
      </p>
    </div>
  </Link>
);

export default SidebarNewsCard;
