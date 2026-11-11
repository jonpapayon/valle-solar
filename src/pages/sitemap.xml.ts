import type { APIRoute } from "astro";

/** Rutas públicas indexables (la 404 queda fuera). Añade aquí las páginas nuevas. */
const rutas = ["/", "/aviso-de-privacidad"];

export const GET: APIRoute = ({ site }) => {
  // El sitemap necesita URLs absolutas: define SITE_URL (dominio pendiente) al compilar en producción.
  if (!site) console.warn("[sitemap] SITE_URL no está definido: el sitemap se genera vacío.");
  const urls = site ? rutas.map((r) => `  <url><loc>${new URL(r, site).href}</loc></url>`).join("\n") + "\n" : "";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
