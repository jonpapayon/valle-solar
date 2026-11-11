/**
 * Datos de la empresa. Aquí solo van datos CONFIRMADOS por el responsable (última actualización: 10 nov 2026).
 * La lista completa de datos confirmados y pendientes está en docs/datos-del-negocio.md.
 */
export const empresa = {
  nombre: "Solar Service Mx",
  servicio: "Instalación de sistemas fotovoltaicos interconectados a la red de CFE, también híbridos con baterías",
  region: "Michoacán",
  whatsapp: {
    /** Formato para mostrar en pantalla. */
    visible: "+52 33 1706 1726",
    /** Formato internacional sin signos, para wa.me y tel:. */
    numero: "523317061726",
  },
  atiende: "el responsable comercial y técnico",

  /** Lo que se instala. */
  servicios: [
    "Sistemas fotovoltaicos interconectados a la red de CFE",
    "Sistemas híbridos con baterías, interconectados a la red",
  ],
  /** Lo que no se ofrece. */
  noOfrece: ["Sistemas autónomos, aislados de la red", "Sistemas de bombeo solar"],

  /** Gestión incluida. */
  gestion: {
    tramiteCfe: "Gestionamos el trámite de interconexión ante CFE; está incluido en la cotización.",
    visitaTecnica: "La visita técnica no tiene costo adicional.",
  },

  /** Municipios atendidos (confirmados). Zamora y Morelia son las bases de referencia. */
  municipios: [
    "Zamora",
    "Jacona",
    "Tangancícuaro",
    "Chilchota",
    "Purépero",
    "Zacapu",
    "Los Reyes",
    "Cotija",
    "Sahuayo",
    "La Piedad",
    "Uruapan",
    "Morelia",
    "Charo",
    "Pátzcuaro",
    "Quiroga",
  ],
  /**
   * Referencia aproximada que da la empresa: alrededor de 80 km desde Zamora y 40 km desde Morelia.
   * NO es una garantía de cobertura: fuera de la lista se confirma caso por caso.
   */
  coberturaAproximada: "alrededor de 80 km desde Zamora y 40 km desde Morelia",
} as const;
