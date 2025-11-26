"use client";

import React, { useState } from "react";
import NewsForm from "@/components/admin/NewsForm";
import NewsList from "@/components/admin/NewsList";
import { INews } from "@/types/news";

export default function NewListPage() {
  const [selectedNews, setSelectedNews] = useState<INews | null>(null);

  // ==============================
  // NewsList থেকে edit click handle
  // ==============================
  const handleEditClick = (item: INews) => {
    setSelectedNews(item);
  };

  // ==============================
  // NewsForm সফলভাবে submit হলে
  // ==============================
  const handleSuccess = () => {
    setSelectedNews(null);
  };

  // ==============================
  // NewsForm modal বন্ধ করলে
  // ==============================
  const handleClose = () => {
    setSelectedNews(null);
  };

  // ==============================
  // News delete handle
  // ==============================
  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি এই news মুছতে চান?")) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete news");

      alert("News deleted successfully!");
      // Optionally, refresh page or trigger NewsList refetch
      window.location.reload(); // সরল উপায়
    } catch (error) {
      console.error("Delete Error:", error);
      alert("News delete failed");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10 relative bg-gray-200">
      {/* ✅ News List */}
      <NewsList onEditClick={handleEditClick} onDelete={handleDelete} />

      {/* ✅ Edit/Add Form Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-white bg-opacity-50 transition-opacity"
            onClick={handleClose}
          ></div>

          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-lg w-[95%] sm:w-[90%] md:w-[80%] max-w-2xl max-h-[90vh] overflow-y-auto p-6 animate-fadeIn scale-100">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <NewsForm
              initialData={selectedNews}
              onSuccess={handleSuccess}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}
