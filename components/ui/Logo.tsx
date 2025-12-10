"use client";
import React from "react";
import Image from "next/image";
import { useGetLogosQuery } from "@/app/redux/features/logo/logoApi";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
}

function Logo({ width = 194, height = 95 }: LogoProps) {
  const { data, isLoading } = useGetLogosQuery({});

  const logoUrl = data?.logos?.[0]?.logoUrl || "/logo/default.png"; // fallback

  return (
    <Link
      href="/"
      className="flex justify-center sm:justify-start flex-shrink-0 w-full sm:w-auto"
    >
      {isLoading ? (
        <div className="w-[120px] h-[50px] bg-gray-200 animate-pulse rounded" />
      ) : (
        <Image
          src={logoUrl}
          alt="Logo"
          width={width}
          height={height}
          className="object-contain"
        />
      )}
    </Link>
  );
}

export default Logo;
