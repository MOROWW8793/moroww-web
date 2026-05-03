export async function GET() {
  const clientId = process.env.GUESTY_CLIENT_ID;
  const clientSecret = process.env.GUESTY_CLIENT_SECRET;

  const endpoints = [
    "https://auth.guesty.com/oauth2/token",
    "https://open-api.guesty.com/oauth2/token",
    "https://api.guesty.com/oauth2/token",
  ];

  const results: Record<string, unknown>[] = [];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "open-api",
          client_id: clientId!,
          client_secret: clientSecret!,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      const data = await res.json();
      results.push({
        endpoint,
        status: res.status,
        ok: res.ok,
        hasToken: !!data.access_token,
      });
    } catch (error) {
      results.push({
        endpoint,
        error: String(error),
      });
    }
  }

  return Response.json({ results });
}
