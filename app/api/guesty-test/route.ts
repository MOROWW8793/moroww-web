export async function GET() {
  const tokenResponse = await fetch(
    "https://open-api.guesty.com/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        scope: "open-api",
        client_id: process.env.GUESTY_CLIENT_ID,
        client_secret: process.env.GUESTY_CLIENT_SECRET,
      }),
      cache: "no-store",
    }
  );

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return Response.json({
      error: "Token request failed",
      status: tokenResponse.status,
      body: tokenData,
      clientIdPresent: !!process.env.GUESTY_CLIENT_ID,
      clientSecretPresent: !!process.env.GUESTY_CLIENT_SECRET,
      clientIdLength: process.env.GUESTY_CLIENT_ID?.length,
    });
  }

  // Token ok — test listings
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

  return Response.json({
    success: true,
    tokenOk: true,
    listingsStatus: listingsResponse.status,
    count: listingsData.results?.length ?? 0,
    first: listingsData.results?.[0] ?? null,
  });
}
