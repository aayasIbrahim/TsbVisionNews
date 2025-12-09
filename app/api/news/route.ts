import { NextResponse,NextRequest, } from "next/server";
import dbConnect from "@/lib/db";
import News from "@/models/News";
import { INews } from "@/types/news";


// ... (অন্যান্য ইম্পোর্ট)

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const url = request.nextUrl;
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const id = pathSegments[2];

    // Fetch single news by ID
    if (id) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return NextResponse.json(
          { success: false, message: "Invalid news ID" },
          { status: 400 }
        );
      }

      const newsItem = await News.findById(id);
      if (!newsItem) {
        return NextResponse.json(
          { success: false, message: "News not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: newsItem });
    }

    // Fetch by category
    const category = url.searchParams.get("category") || "all";
    const query: { category?: string } = {};

    if (category !== "all") {
      query.category = decodeURIComponent(category);
    }

    const newsheadline = await News.find(query, "title")
      .sort({ createdAt: -1 })
      .limit(10); // ⬅ প্রথম ১০টা headline

    const totalNewsCount = await News.countDocuments({});
    const filteredNewsCount = await News.countDocuments(query);

    // ⬅ এখানে limit(10) যোগ করলাম
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(10); // ⬅ প্রথম ১০টা নিউজ রিটার্ন করবে

    return NextResponse.json({
      success: true,
      data: news,
      newsheadline,
      totalCount: totalNewsCount,
      filteredCount: filteredNewsCount,
    });
  } catch (error) {
    console.error("GET News Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news",
        error: error instanceof Error ? error.message : null,
      },
      { status: 500 }
    );
  }
}


// POST new news
export async function POST(req: Request) {
  await dbConnect();
  const body: INews = await req.json();
  const news = await News.create(body);
  return NextResponse.json({ success: true, data: news }, { status: 201 });
}
