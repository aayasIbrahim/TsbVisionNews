import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";

// Next.js কনফিগ যা ডাইনামিক রেন্ডারিং বাধ্যতামূলক করে
export const dynamic = "force-dynamic";

// রুট হ্যান্ডলারের জন্য প্যারামিটারের প্রকার (Type)
type Params = {
  params: { id: string };
};

// =========================================================
// ✅ একটি খবর GET করা (পড়া)
// =========================================================
export async function GET(req: NextRequest, { params }: Params) {
  try {
    // ডেটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();

    // ID অনুযায়ী ডকুমেন্ট খুঁজে বের করা
    const news = await News.findById(params.id);

    // ডকুমেন্ট না পেলে 404 ত্রুটি ফেরত দেওয়া
    if (!news)
      return NextResponse.json({ error: "News not found" }, { status: 404 });

    return NextResponse.json(news);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    // অপ্রত্যাশিত ত্রুটির জন্য 500 ত্রুটি ফেরত দেওয়া
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// =========================================================
// ✅ News আপডেট করা (PUT)
// =========================================================
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    // ডেটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();
    const data = await req.json(); // রিকোয়েস্ট বডি থেকে ডেটা নেওয়া

    // ডকুমেন্ট খুঁজে বের করা এবং আপডেট করা
    const updated = await News.findByIdAndUpdate(params.id, data, {
      new: true, // আপডেট হওয়া ডকুমেন্টটি ফেরত দেবে
      runValidators: true, // আপডেটের আগে স্কিমা ভ্যালিডেশন চালাবে
    });

    // ডকুমেন্ট না পেলে 404 ত্রুটি ফেরত দেওয়া
    if (!updated)
      return NextResponse.json({ error: "News not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";

    // Mongoose ভ্যালিডেশন ত্রুটি ধরা (যদি runValidators: true থাকে)
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: message }, { status: 400 }); // ক্লায়েন্ট সাইড ত্রুটির জন্য 400
    }

    // অন্যান্য সার্ভার ত্রুটির জন্য
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// =========================================================
// ✅ News মুছে ফেলা (DELETE)
// =========================================================
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    // ডেটাবেসের সাথে সংযোগ স্থাপন
    await connectDB();
    // ID অনুযায়ী ডকুমেন্ট খুঁজে বের করা এবং মুছে ফেলা
    const deleted = await News.findByIdAndDelete(params.id);

    // ডকুমেন্ট না পেলে 404 ত্রুটি ফেরত দেওয়া
    if (!deleted)
      return NextResponse.json({ error: "News not found" }, { status: 404 });

    // সফলভাবে মুছে ফেলার স্ট্যাটাস ফেরত দেওয়া
    return NextResponse.json({ success: true, id: params.id }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
