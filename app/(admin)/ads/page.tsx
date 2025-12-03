"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface AdsForm {
  title: string;
  image: string;
  link: string;
  position: string;
}

export default function AddAds() {
  const [form, setForm] = useState<AdsForm>({
    title: "",
    image: "",
    link: "",
    position: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/ads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Ads added successfully!");
      setForm({ title: "", image: "", link: "", position: "" });
    }
  };

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Ads</h2>

        <form onSubmit={handleSubmit}>
          <ul className="space-y-5 bg-white p-6 rounded-xl shadow-md border">
            
            {/* Title */}
            <li className="flex flex-col">
              <label className="font-semibold mb-1">Ads Title</label>
              <input
                name="title"
                value={form.title}
                placeholder="Enter Ads Title"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </li>

            {/* Image */}
            <li className="flex flex-col">
              <label className="font-semibold mb-1">Image URL</label>
              <input
                name="image"
                value={form.image}
                placeholder="Example: https://example.com/image.jpg"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </li>

            {/* Link */}
            <li className="flex flex-col">
              <label className="font-semibold mb-1">Redirect Link</label>
              <input
                name="link"
                value={form.link}
                placeholder="https://your-site.com"
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              />
            </li>

            {/* Position */}
            <li className="flex flex-col">
              <label className="font-semibold mb-1">Ad Position</label>
              <select
                name="position"
                value={form.position}
                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
                onChange={handleChange}
                required
              >
                <option value="">Choose Ad Position</option>
                <option value="sidebar">Sidebar</option>
                <option value="top-banner">Top Banner</option>
                <option value="bottom-banner">Bottom Banner</option>
              </select>
            </li>

            {/* Button */}
            <li className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
              >
                Add Ads
              </button>
            </li>

          </ul>
        </form>
      </div>
    </section>
  );
}
