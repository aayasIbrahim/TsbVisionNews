"use client";

import { useState } from "react";

const categories = [
  { name: "রাজনীতি", href: "/politics" },
  { name: "জাতীয়", href: "/national" },
  { name: "বাংলাদেশ", href: "/bangladesh" },
  { name: "বিশ্ব", href: "/world" },
  { name: "বাণিজ্য", href: "/business" },
  { name: "খেলা", href: "/sports" },
];

export default function AddNews() {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    content: "",
    imageSrc: "",
    isFeatured: false,
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const target = e.target;
  const name = target.name;

  let value: string | boolean = target.value;

  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    value = target.checked; // now TypeScript knows checked exists
  }

  setFormData({ ...formData, [name]: value });
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("News added successfully!");
      setFormData({
        title: "",
        summary: "",
        category: "",
        content: "",
        imageSrc: "",
        isFeatured: false,
      });
    } else {
      alert("Failed to add news");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg lg:mt-9">
      <h1 className="text-3xl font-bold mb-6 text-center">নিউজ যোগ করুন</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* First row: Title & Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            name="title"
            placeholder="শিরোনাম"
            value={formData.title}
            onChange={handleChange}
            required
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              বিভাগ নির্বাচন করুন
            </option>
            {categories.map((cat) => (
              <option key={cat.href} value={cat.href}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Second row: Summary */}
        <textarea
          name="summary"
          placeholder="সংক্ষিপ্ত বিবরণ"
          value={formData.summary}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Third row: Content */}
        <textarea
          name="content"
          placeholder="বিস্তারিত সংবাদ"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={6}
        />

        {/* Fourth row: Image URL */}
        <input
          name="imageSrc"
          placeholder="ছবির URL"
          value={formData.imageSrc}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Fifth row: Featured checkbox */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <span className="text-gray-700">জনপ্রিয় সংবাদ হিসেবে চিহ্নিত করুন</span>
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition text-lg font-semibold"
        >
          সংবাদ যোগ করুন
        </button>
      </form>
    </div>
  );
}
