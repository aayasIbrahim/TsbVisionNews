import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { authOptions } from "@/lib/authOption";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized!" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    await connectDB();

    const user = await User.findById(session.user.id);

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { message: "বর্তমান পাসওয়ার্ড ভুল!" },
        { status: 400 }
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ message: "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!" });
  } catch  {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
