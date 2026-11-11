import type { APIRoute } from "astro";
import { sitio } from "../config/sitio";

export const GET: APIRoute = ({ site }) => {
  // Con sitio.indexable = false se pide no rastrear (src/config/sitio.ts).
  const lineas = ["User-agent: *", sitio.indexable ? "Allow: /" : "Disallow: /"];
  if (site) lineas.push("", `Sitemap: ${new URL("/sitemap.xml", site).href}`);
  return new Response(lineas.join("\n") + "\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
