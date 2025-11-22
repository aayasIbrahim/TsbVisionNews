This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

{
  "title": "দুই ধাপে বিশ্ব ইজতেমা, তারিখ জানালেন স্বরাষ্ট্রমন্ত্রী",
  "summary": "আগামী বছর দুই ধাপে বিশ্ব ইজতেমা অনুষ্ঠিত হবে প্রথম ধাপে ০২ জানুয়ারি থেকে ৫ ফেব্রুয়ারি পর্যন্ত এবং দ্বিতীয় পর্ব ৭ ফেব্রুয়ারি থেকে ১০ ফেব্রুয়ারি পর্যন্ত অনুষ্ঠিত হবে...",
  "content": "পুরো নিউজের বিস্তারিত এখানে...",
  "category": "National",
  "imageSrc": "https://placehold.co/600x400/059669/ffffff?text=Ijtema+Ground",
  "author": "Ayas Ibrahim",
  "publishedAt": "2025-11-22T08:00:00+06:00",
  "updatedAt": "2025-11-22T08:00:00+06:00",
  "tags": ["Ijtema", "Dhaka", "Bangladesh"],
  "isFeatured": true
}

const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String, // full article content (optional if you have summary only)
  },
  category: {
    type: String, // e.g., "National", "International", "Sports"
    required: true
  },
  imageSrc: {
    type: String, // featured image URL
  },
  author: {
    type: String,
    default: "Admin"
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  },
  tags: [String], // optional, for filtering or search
  isFeatured: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('News', NewsSchema);


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
