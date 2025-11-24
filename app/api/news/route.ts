
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import News from "@/models/News";
import { INews } from "@/types/news";

// GET all news

// GET all news
export async function GET() {
  await dbConnect();
  const news = await News.find({});
  return NextResponse.json({ success: true, data: news });
}

// POST new news
export async function POST(req: Request) {
  await dbConnect();
  const body: INews = await req.json();
  const news = await News.create(body);
  return NextResponse.json({ success: true, data: news }, { status: 201 });
}
