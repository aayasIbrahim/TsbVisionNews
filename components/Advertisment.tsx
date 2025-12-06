"use client";

import React from "react";
import { useGetAdsQuery } from "@/app/redux/features/ads/adsApi";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import Image from "next/image";
import DynamicTitleFavicon from "./DynamicTitleFavicon";

const Advertisement: React.FC = () => {
  const { data, isLoading, } = useGetAdsQuery();
const adsArray = data?.ads || [];

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">বিজ্ঞাপন</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <LoadingSkeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  if (adsArray.length === 0) return null;



  return (
    <>
      <DynamicTitleFavicon title="Advertisement" faviconUrl="/favicon.ico" />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">বিজ্ঞাপন</h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adsArray?.map((ad) => (
            <a
              key={ad._id}
              href={ad.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative w-full h-48">
                <Image
                  src={ad.image}
                  alt={ad.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{ad.title}</h2>
                {ad.link && (
                  <p className="text-blue-600 underline break-all">
                    {ad.link}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* যোগাযোগের অংশ */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">আপনার বিজ্ঞাপন দিন</h2>
          <p className="text-gray-700 mb-4">
            আপনি চাইলে আপনার ব্যবসা বা প্রোডাক্ট আমাদের ওয়েবসাইটে বিজ্ঞাপন দিতে
            পারেন। আমাদের সাথে যোগাযোগ করুন:
          </p>
          <p className="text-blue-600 underline cursor-pointer">
            ইমেইল: <a href="mailto:tsbvisionnews.net@gmail.com">tsbvisionnews.net@gmail.com</a>
          </p>
          <p className="text-blue-600 underline cursor-pointer">
            ফোন: <a href="tel:01929450836">01929450836</a>
          </p>
        </section>
      </section>
    </>
  );
};

export default Advertisement;
