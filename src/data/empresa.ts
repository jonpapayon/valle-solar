/**
 * Datos de la empresa. Aquí solo van datos CONFIRMADOS por el propietario.
 *
 * Pendientes de validar (no se publican hasta tenerlos):
 * - Municipios concretos de cobertura (hoy solo "Michoacán").
 * - Si se ofrecen sistemas interconectados con almacenamiento (baterías).
 * - Esquema(s) de interconexión con los que se trabaja.
 * - Quién gestiona el trámite de interconexión con CFE.
 * - Costo de la visita técnica, tiempos de instalación y de respuesta.
 * - Horario, correo, dirección, razón social, logotipo, fotografías propias.
 */
export const empresa = {
  nombre: "Solar Service Mx",
  servicio: "Instalación de sistemas fotovoltaicos interconectados a la red de CFE",
  region: "Michoacán",
  whatsapp: {
    /** Formato para mostrar en pantalla. */
    visible: "+52 33 1706 1726",
    /** Formato internacional sin signos, para wa.me y tel:. */
    numero: "523317061726",
  },
  atiende: "el responsable comercial y técnico",
} as const;
