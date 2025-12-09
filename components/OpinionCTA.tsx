"use client";
import Link from "next/link";
import DynamicTitleFavicon from "./DynamicTitleFavicon";

export default function OpinionCTA() {
  return (
    <>
    <DynamicTitleFavicon title="মতামত" faviconUrl="/favicon.ico" />
    <aside className="max-w-3xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-md mt-7">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        আপনার মতামত দিন
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
        নিচের নির্দেশনা মেনে আপনার মূল্যবান মতামত পাঠান — প্রকাশের আগে আমরা
        সংক্ষেপে যাচাই করব।
      </p>

      {/* List */}
      <ul className="space-y-4 mb-6">
        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span className="text-xl">✅</span>
          <span className="text-gray-800 text-sm">
            সংক্ষিপ্ত ও স্পষ্ট: <strong>২০০–৫০০ শব্দ</strong> আদর্শ।
          </span>
        </li>

        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span className="text-xl">🖊️</span>
          <span className="text-gray-800 text-sm">
            ভদ্র ভাষায় মতামত লিখুন — ব্যক্তিগত আক্রমণ করা যাবে না।
          </span>
        </li>

        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span className="text-xl">📎</span>
          <span className="text-gray-800 text-sm">
            চাইলে <em>নাম</em> ও <em>ইমেইল</em> দিন — না দিলেও চলবে।
          </span>
        </li>

        <li className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
          <span className="text-xl">📸</span>
          <span className="text-gray-800 text-sm">
            ছবি বা ডকুমেন্ট থাকলে লিংক যোগ করতে পারেন। (ঐচ্ছিক)
          </span>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          href="/opinion/submit"
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          ✉️ মতামত পাঠান
        </Link>

        <a
          href="mailto:tsbvisionnews.net@gmail.com?subject=Opinion%20Submission"
          className="inline-flex items-center px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition dark:text-gray-200 dark:hover:bg-slate-700"
        >
          📧 ইমেইল করুন
        </a>
      </div>
    </aside>
    </>
  );
}
