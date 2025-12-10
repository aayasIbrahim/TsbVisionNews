"use client";
import React from "react";
import Image from "next/image";
import {
  useGetLogosQuery,
  useDeleteLogoMutation,
} from "@/app/redux/features/logo/logoApi";
import { LogoType } from "@/types/logo";

export default function LogoList() {
  const { data, isLoading } = useGetLogosQuery({});
  const [deleteLogo] = useDeleteLogoMutation();

  const logos: LogoType[] = data?.logos || [];
  // console.log("Logos:", logos);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this logo?")) return;
    await deleteLogo(id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
      {logos.map((logo) => (
        <div
          key={logo._id}
          className="border rounded-xl p-3 flex flex-col items-center"
        >
          <div className="relative w-20 h-20">
            <Image
              src={logo.logoUrl}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>

          <button
            onClick={() => handleDelete(logo._id)}
            className="mt-3 text-sm text-white bg-red-500 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
