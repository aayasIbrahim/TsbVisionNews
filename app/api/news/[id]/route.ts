import { NextResponse,NextRequest } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;  // FIXED

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const news = await News.findById(id);
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news.toObject());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// =========================================================
// ✅ PUT: Update single news
// =========================================================
export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id: newsId } = context.params;

    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const data = await req.json();

    const updated = await News.findByIdAndUpdate(newsId, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(updated.toObject());
  } catch (error: unknown) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// =========================================================
// ✅ DELETE: Delete single news
// =========================================================
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id: newsId } = context.params;
    console.log("Deleting news id:", newsId);

    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await News.findByIdAndDelete(newsId);

    if (!deleted) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: newsId }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
