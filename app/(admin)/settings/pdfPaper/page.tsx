"use client";

import React, { useState } from "react";

export default function PdfUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("pdf", file);

    const res = await fetch("/api/upload-pdf", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setUploadedUrl(data.url);
    }
  }

  return (
    <div className="p-4 border rounded-md w-full max-w-md">
      <h2 className="font-bold text-xl mb-2">Upload PDF</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border p-2 w-full"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {uploadedUrl && (
        <p className="mt-3 text-green-600">
          Uploaded: <a href={uploadedUrl} target="_blank" className="underline">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
}
