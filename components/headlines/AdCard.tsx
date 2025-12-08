"use client";

import React from "react";
import Image from "next/image";
import { useGetAdsQuery } from "@/app/redux/features/ads/adsApi";

const AdCard = () => {
  const { data, isLoading, isError } = useGetAdsQuery();

  if (isLoading) return <p>Loading Ads...</p>;
  if (isError) return <p>Failed to load ads</p>;

  const ads = data?.ads || [];

  if (ads.length === 0) return <p>No ads available</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-center font-semibold">Ads</h2>
      {ads.slice(0, 2).map((ad) => (
        <a
          key={ad._id}
          href={ad.link.startsWith("http") ? ad.link : `https://${ad.link}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-lg shadow hover:shadow-lg transition p-2 bg-white"
        >
          <Image
            src={ad.image}
            alt={ad.title}
            width={400}
            height={700}
            className="w-full h-64 object-cover rounded-md mb-2"
          />
          <h3 className="font-semibold text-center text-sm">{ad.title}</h3>
        </a>
      ))}
    </div>
  );
};

export default AdCard;
