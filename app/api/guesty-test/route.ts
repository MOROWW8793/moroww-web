import { getListings } from "@/lib/guesty";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const listings = await getListings();
    return NextResponse.json({
      success: true,
      count: listings.length,
      first: listings[0] ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
