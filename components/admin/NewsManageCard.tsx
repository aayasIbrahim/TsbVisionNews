"use client";

import Image from "next/image";
import { INews } from "@/types/news";

interface Props {
  item: INews;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const NewsManageCard = ({ item, onEdit, onDelete }: Props) => {
  return (
    <div className="p-4 bg-white border-b border-gray-300 rounded-md shadow-sm mb-4">
      <h2 className="text-sm text-red-500 font-medium">ক্যাটেগরি: {item.category}</h2>
      <h3 className="text-lg sm:text-xl font-semibold mt-1 break-words">{item.title}</h3>

      <p className="text-gray-600 mt-2">
        <span className="font-semibold text-black">সংক্ষিপ্ত বিবরণ :</span> {item.summary}
      </p>

      {item.content && (
        <p className="mt-2 text-gray-700 break-words">
          <span className="font-semibold text-black">বিস্তারিত সংবাদ :</span> {item.content}
        </p>
      )}

      {item.imageSrc && (
        <div className="mt-3 w-full h-48 sm:h-60 relative">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover rounded"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Edit / Delete Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
        <button
          onClick={() => onEdit(item?._id)}
          className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(item?._id)}
          className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NewsManageCard;
