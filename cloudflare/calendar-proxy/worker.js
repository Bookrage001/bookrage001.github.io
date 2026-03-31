/**
 * Cloudflare Worker: calendar-proxy
 *
 * Fetches the public Google Calendar ICS feed server-side and returns it with
 * the required CORS headers so the Angular frontend can read the response body.
 *
 * Deploy:
 *   1. In the Cloudflare dashboard go to Workers & Pages → Create application → Create Worker.
 *   2. Name it "calendar-proxy" (or any name you prefer).
 *   3. Paste the contents of this file into the editor and click Deploy.
 *   4. The worker will be available at:
 *        https://calendar-proxy.<your-subdomain>.workers.dev/ics
 *
 * Custom domain (optional):
 *   1. Keep the DNS record for calebscalender.bookrage001.com proxied (orange cloud).
 *   2. Open the Worker → Settings → Domains & Routes → Add Custom Domain.
 *   3. Enter calebscalender.bookrage001.com.
 *   4. The /ics endpoint will then be at https://calebscalender.bookrage001.com/ics.
 *
 * Update environment.prod.ts once you have the final URL:
 *   calendarIcsUrls: ['https://calebscalender.bookrage001.com/ics', ...]
 */

const CALENDAR_ICS_URL =
  "https://calendar.google.com/calendar/ical/caleb.ardern%40gmail.com/public/basic.ics";

const ALLOWED_ORIGINS = new Set([
  "https://bookrage001.com",
  "http://localhost:4200",
]);

function corsHeaders(requestOrigin) {
  const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://bookrage001.com";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const ch = corsHeaders(request.headers.get("Origin") ?? "");

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: ch });
    }

    if (url.pathname !== "/ics") {
      return new Response("Not found", { status: 404, headers: ch });
    }

    let upstreamResponse;
    try {
      upstreamResponse = await fetch(CALENDAR_ICS_URL, {
        headers: { "User-Agent": "bookrage001-calendar-proxy" },
        cf: {
          cacheTtl: 300,
          cacheEverything: true,
        },
      });
    } catch {
      return new Response("Failed to reach Google Calendar", { status: 502, headers: ch });
    }

    if (!upstreamResponse.ok) {
      return new Response("Upstream returned an error", {
        status: upstreamResponse.status,
        headers: ch,
      });
    }

    const body = await upstreamResponse.text();

    return new Response(body, {
      status: 200,
      headers: {
        ...ch,
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  },
};
