import { formatoNumero, type Estimacion, type Periodo } from "./calculo.ts";

export type TipoCliente = "casa" | "negocio";

export interface DatosCalculadora {
  periodo: Periodo;
  kwh: number | null;
  importe: number | null;
  tipo: TipoCliente | null;
  municipio: string | null;
}

export interface DatosContacto {
  nombre: string;
  tipo: TipoCliente | null;
  municipio: string | null;
  mensaje: string | null;
}

export function urlWhatsApp(numero: string, texto?: string): string {
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

const nombrePeriodo: Record<Periodo, string> = { bimestral: "Bimestral", mensual: "Mensual" };
const nombreTipo: Record<TipoCliente, string> = { casa: "Casa", negocio: "Negocio" };

function lineasDatos(d: DatosCalculadora): string[] {
  const l = [`• Periodo del recibo: ${nombrePeriodo[d.periodo]}`];
  if (d.kwh !== null) l.push(`• Consumo: ${formatoNumero(d.kwh)} kWh`);
  if (d.importe !== null) l.push(`• Importe del recibo: $${formatoNumero(d.importe)}`);
  if (d.tipo) l.push(`• Tipo: ${nombreTipo[d.tipo]}`);
  if (d.municipio) l.push(`• Municipio: ${d.municipio}`);
  return l;
}

export function lineasEstimacion(e: Estimacion): string[] {
  return [
    `• Consumo diario: ${formatoNumero(e.kwhDia, 1)} kWh`,
    `• Potencia aproximada: ${formatoNumero(e.kwp, 1)} kWp`,
    `• Paneles aproximados: ${e.paneles} de ${e.potenciaPanelW} W`,
  ];
}

/** Mensaje cuando hay consumo en kWh y una estimación calculada. */
export function mensajeEstimacion(marca: string, d: DatosCalculadora, e: Estimacion): string {
  return [
    `Hola, ${marca}. Usé la calculadora de su sitio:`,
    ...lineasDatos(d),
    "Estimación orientativa:",
    ...lineasEstimacion(e),
    "Me gustaría una cotización.",
  ].join("\n");
}

/** Mensaje cuando la persona no tiene el consumo en kWh: pide asesoría con su recibo. */
export function mensajeSinConsumo(marca: string, d: DatosCalculadora): string {
  return [
    `Hola, ${marca}. No encuentro el consumo en kWh de mi recibo.`,
    ...lineasDatos(d),
    "Les comparto una foto de mi recibo para recibir asesoría.",
  ].join("\n");
}

/** Mensaje del formulario de contacto; incluye la estimación si la persona lo pide. */
export function mensajeContacto(
  marca: string,
  c: DatosContacto,
  calculo?: { datos: DatosCalculadora; estimacion: Estimacion } | null,
): string {
  const l = [`Hola, ${marca}. Soy ${c.nombre} y quiero cotizar un sistema fotovoltaico interconectado.`];
  if (c.tipo) l.push(`• Tipo: ${nombreTipo[c.tipo]}`);
  if (c.municipio) l.push(`• Municipio: ${c.municipio}`);
  if (c.mensaje) l.push("", c.mensaje);
  if (calculo) {
    l.push("", "Datos de la calculadora:", ...lineasDatos(calculo.datos).filter((x) => !x.startsWith("• Tipo") && !x.startsWith("• Municipio")));
    l.push("Estimación orientativa:", ...lineasEstimacion(calculo.estimacion));
  }
  return l.join("\n");
}
