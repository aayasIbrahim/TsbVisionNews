"use client";
import React, { useState } from "react";
import { useUploadLogoMutation } from "@/app/redux/features/logo/logoApi";
import Image from "next/image";

export default function ChangeLogo() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploadLogo, { isLoading }] = useUploadLogoMutation();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      await uploadLogo(selectedFile).unwrap();
      alert("Logo updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to upload logo");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-2xl font-semibold mb-4">Change Logo</h2>

      {/* Upload Box */}
      <label
        className="
          flex flex-col items-center justify-center 
          w-full h-40 cursor-pointer
          bg-gray-50 border border-dashed border-gray-300 
          rounded-xl hover:bg-gray-100 transition
        "
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFileChange(e.target.files[0])
          }
        />

        {!preview ? (
          <div className="text-center text-gray-500">
            <p className="text-sm">Click to upload your logo</p>
            <p className="text-xs text-gray-400">PNG, JPG allowed</p>
          </div>
        ) : (
          <div className="relative h-32 w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}
      </label>

      {/* Remove Button */}
      {preview && (
        <button
          onClick={() => {
            setPreview(null);
            setSelectedFile(null);
          }}
          className="text-red-500 text-sm mt-3"
        >
          Remove Logo
        </button>
      )}

      {/* Save Button */}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || isLoading}
        className="
          w-full mt-5 py-3 rounded-xl 
          bg-gray-600 text-white font-semibold 
          disabled:bg-gray-300
          transition
        "
      >
        {isLoading ? "Uploading..." : "Save Logo"}
      </button>
    </div>
  );
}
