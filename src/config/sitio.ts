/**
 * Configuración central del sitio: dominio, logotipo y fotografías.
 * Todo lo marcado como PENDIENTE se rellena cuando el responsable lo entregue;
 * mientras tanto el sitio usa la marca tipográfica y las ilustraciones técnicas.
 */

export interface Foto {
  /** Ruta dentro de /public, p. ej. "/fotos/casa-01.jpg". */
  src: string;
  /** Texto alternativo: qué se ve en la foto. */
  alt: string;
  ancho: number;
  alto: number;
}

export interface Sitio {
  /**
   * PENDIENTE: dominio público, con https y sin barra final (p. ej. "https://dominio.mx").
   * La variable de entorno SITE_URL, si existe, tiene prioridad.
   * Con él se generan la URL canónica, og:url, el sitemap y la línea Sitemap de robots.txt.
   */
  dominio: string | null;
  /**
   * PENDIENTE: logotipo oficial en /public (SVG preferible). Con null se usa la marca tipográfica.
   * Ejemplo: { src: "/marca/logo.svg", alt: "Solar Service Mx", ancho: 160, alto: 32 }
   */
  logo: Foto | null;
  /** Versión del logotipo para fondos oscuros (pie de página). Si es null se usa `logo`. */
  logoClaro: Foto | null;
  /**
   * PENDIENTE: fotografías reales de instalaciones de la empresa (con permiso del cliente).
   * Cada espacio muestra la ilustración técnica mientras sea null. Nunca usar fotos de stock aquí.
   */
  fotos: {
    casa: Foto | null;
    negocio: Foto | null;
  };
}

export const sitio: Sitio = {
  dominio: null,
  logo: null,
  logoClaro: null,
  fotos: {
    casa: null,
    negocio: null,
  },
};
