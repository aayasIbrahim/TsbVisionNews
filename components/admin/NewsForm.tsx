"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// এই ইউটিলিটি ফাইলটি আপনার প্রকল্পের রুটের সাপেক্ষে সঠিক হতে হবে
import { uploadToCloudinary } from "@/utils/utils"; 

// --- সংবাদের প্রাথমিক ডেটার জন্য টাইপ সংজ্ঞা (Type Definition) ---
interface NewsData {
  _id?: string; // আপডেট করার জন্য ID ঐচ্ছিক (Optional)
  title: string;
  summary: string;
  category: string;
  content: string;
  imageSrc: string;
  isFeatured?: boolean;
}

// --- কম্পোনেন্টের Props সংজ্ঞা ---
interface NewsFormProps {
  initialData?: NewsData | null;   // ← এখানে null allow করা হলো
  onSuccess: () => void;
  onClose?:()=>void;
}

const categories = [
  { name: "রাজনীতি", href: "politics" },
  { name: "জাতীয়", href: "national" },
  { name: "বাংলাদেশ", href: "bangladesh" },
  { name: "বিশ্ব", href: "world" },
  { name: "বাণিজ্য", href: "business" },
  { name: "খেলা", href: "sports" },
  { name: "বিনোদন", href: "entertainment" },
];

export default function NewsForm({ initialData,onSuccess  }: NewsFormProps) {
  const isEditMode = !!initialData?._id; // এটি সম্পাদনা মোড কিনা তা নির্ধারণ করে

  // ফর্ম ডেটার জন্য স্টেট
  const [formData, setFormData] = useState<NewsData>(
    initialData || {
      title: "",
      summary: "",
      category: "",
      content: "",
      imageSrc: "", // এখানে ক্লাউডিনারি URL/Public ID থাকবে
      isFeatured: false,
    }
  );
  
  // ছবির ফাইল ও প্রিভিউ URL-এর জন্য স্টেট
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imageSrc || ""); // প্রাথমিক ছবি থাকলে তা দেখাবে
  const [loading, setLoading] = useState(false);

  // এডিট মোডে, যদি initialData পরিবর্তন হয়, তবে ফর্ম ডেটা আপডেট করা হবে
  useEffect(() => {
    if (initialData) {
        setFormData(initialData);
        setPreviewUrl(initialData.imageSrc || "");
    }
  }, [initialData]);

  // ইনপুট পরিবর্তন হ্যান্ডেল করা
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;
    let newValue: string | boolean = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // ছবি ইনপুট পরিবর্তন হ্যান্ডেল করা
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };
  
  // --- UPDATED HANDLE SUBMIT: POST ও PUT হ্যান্ডেল করার জন্য ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.summary || !formData.category || !formData.content) {
      alert("অনুগ্রহ করে শিরোনাম, সংক্ষিপ্ত বিবরণ, বিভাগ এবং বিস্তারিত সংবাদ পূরণ করুন।");
      return;
    }

    if (!imageFile && !formData.imageSrc) {
      alert("অনুগ্রহ করে একটি ছবি আপলোড করুন।");
      return;
    }

    try {
      setLoading(true);
      let uploadedImageUrl = formData.imageSrc;

      if (imageFile) {
        console.log("Uploading image to Cloudinary...");
        uploadedImageUrl = await uploadToCloudinary(imageFile);
        console.log("Uploaded Image URL:", uploadedImageUrl);

        if (!uploadedImageUrl) throw new Error("Cloudinary-তে ছবি আপলোড ব্যর্থ হয়েছে।");
      }

      const submitData: NewsData = { ...formData, imageSrc: uploadedImageUrl };

      const apiMethod = isEditMode ? "PUT" : "POST";
      const apiUrl = isEditMode ? `/api/news/${formData._id}` : "/api/news";
      console.log("Editing news ID:", formData._id);

      const bodyData = isEditMode ? { ...submitData, _id: undefined } : submitData;

      console.log("Submitting data to API:", bodyData);

      const response = await fetch(apiUrl, {
        method: apiMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API কল ব্যর্থ হয়েছে: ${errorData.error || response.statusText}`);
      }

      const result = await response.json();
      console.log("API response:", result);
      alert(`News ${isEditMode ? "successfully updated" : "submitted successfully"}!`);

      // reset only if new
      if (!isEditMode) {
        setFormData({
          title: "",
          summary: "",
          category: "",
          content: "",
          imageSrc: "",
          isFeatured: false,
        });
        setPreviewUrl("");
        setImageFile(null);
      }

      onSuccess();
    //   onClose.(); // modal close

    } catch (err) {
      console.error("Submit error:", err);
      alert(
        `সংবাদ ${isEditMode ? "আপডেট" : "যুক্ত"} করতে ব্যর্থ। ত্রুটি: ${
          err instanceof Error ? err.message : "অজানা ত্রুটি"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Omitted: return block (unchanged, as the form structure is correct) ---
  return (
    <div className="max-w-2xl p-5  bg-white shadow ">
      <h2 className="text-2xl font-semibold mb-6">
        {isEditMode ? "সংবাদ সম্পাদনা করুন" : "সংবাদ যুক্ত করুন"}
      </h2>

      <form onSubmit={handleSubmit}>
        <ul className="space-y-4 list-none p-0">
          {/* Title */}
          <li>
            <input
              type="text"
              name="title"
              placeholder="সংবাদের শিরোনাম"
              value={formData.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>

          {/* Summary */}
          <li>
            <textarea
              name="summary"
              placeholder="সংক্ষিপ্ত বিবরণ"
              value={formData.summary}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </li>

          {/* Category */}
          <li>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">বিভাগ নির্বাচন করুন</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </li>

          {/* Content */}
          <li>
            <textarea
              name="content"
              placeholder="বিস্তারিত সংবাদ লিখুন"
              value={formData.content}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </li>

          {/* Featured Checkbox */}
          <li>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>ফিচার্ড সংবাদ</span>
            </label>
          </li>

          {/* Image Upload */}
          <li>
            <label className="block mb-1">ছবি আপলোড করুন (পরিবর্তন করতে চাইলে)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </li>

          {/* Image Preview */}
          {previewUrl && (
            <li className="relative">
              <Image
                src={previewUrl}
                alt="সংবাদের ছবি"
                width={300}
                height={200}
                className="rounded border object-cover"
                unoptimized={previewUrl.startsWith("blob:")} // স্থানীয় প্রিভিউর জন্য
              />
              {/* প্রিভিউ সরানোর জন্য বাটন, যদি এটি ফাইল আপলোড থেকে আসে */}
              {imageFile && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(formData.imageSrc); // পূর্বের ছবিতে ফিরে যান
                    setImageFile(null); // নতুন আপলোড ফাইল বাতিল করুন
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm"
                  title="ছবি বাতিল করুন"
                >
                  ✕
                </button>
              )}
            </li>
          )}

          {/* Submit Button */}
          <li>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading 
                ? "আপলোড হচ্ছে..." 
                : isEditMode ? "সংবাদ আপডেট করুন" : "সংবাদ যুক্ত করুন"
              }
            </button>
          </li>
        </ul>
      </form>
    </div>
  );
}