import { getGuestyToken } from "@/lib/guesty";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await getGuestyToken();
    return NextResponse.json({ success: true, token: token.slice(0, 20) + "..." });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
