import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GUESTY_CLIENT_ID;
  const clientSecret = process.env.GUESTY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      error: "Credentials ontbreken",
      clientId: !!clientId,
      clientSecret: !!clientSecret,
    });
  }

  try {
    const tokenResponse = await fetch(
      "https://auth.guesty.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "open-api",
          client_id: clientId,
          client_secret: clientSecret,
        }),
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return NextResponse.json({
        error: "Token fetch mislukt",
        status: tokenResponse.status,
        response: tokenData,
      });
    }

    const listingsResponse = await fetch(
      "https://open-api.guesty.com/v1/listings?limit=5",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const listingsData = await listingsResponse.json();

    return NextResponse.json({
      success: true,
      tokenOk: true,
      listingsStatus: listingsResponse.status,
      count: listingsData.results?.length ?? 0,
      first: listingsData.results?.[0] ?? null,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Fetch failed",
      message: String(error),
    });
  }
}
