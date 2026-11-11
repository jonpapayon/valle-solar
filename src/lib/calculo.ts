export type Periodo = "bimestral" | "mensual";

export interface ParametrosCalculo {
  diasPorPeriodo: Record<Periodo, number>;
  horasSolPico: number;
  factorRendimiento: number;
  potenciaPanelW: number;
  consumoMaxKwh: number;
}

export interface Estimacion {
  /** Consumo diario promedio, kWh. */
  kwhDia: number;
  /** Potencia fotovoltaica aproximada necesaria, kWp. */
  kwp: number;
  /** Número aproximado de paneles. */
  paneles: number;
  potenciaPanelW: number;
}

/**
 * Estimación orientativa del tamaño del sistema a partir SOLO del consumo en kWh.
 * Nunca convierte pesos a kWh. Devuelve null si el consumo no es válido.
 */
export function estimarSistema(
  kwhPeriodo: number | null,
  periodo: Periodo,
  p: ParametrosCalculo,
): Estimacion | null {
  if (kwhPeriodo === null || !Number.isFinite(kwhPeriodo)) return null;
  if (kwhPeriodo <= 0 || kwhPeriodo > p.consumoMaxKwh) return null;
  const kwhDia = kwhPeriodo / p.diasPorPeriodo[periodo];
  const kwp = kwhDia / (p.horasSolPico * p.factorRendimiento);
  const paneles = Math.max(1, Math.ceil((kwp * 1000) / p.potenciaPanelW));
  return { kwhDia, kwp, paneles, potenciaPanelW: p.potenciaPanelW };
}

/**
 * Lee un número escrito por una persona en México: "1,150", "1 150", "1150.5", "$4,800".
 * Devuelve null si está vacío o no es un número.
 */
export function leerNumero(texto: string | null | undefined): number | null {
  if (!texto) return null;
  const limpio = texto.replace(/[\s,$]/g, "").replace(/kwh$/i, "");
  if (limpio === "" || !/^\d*\.?\d+$/.test(limpio)) return null;
  const n = Number(limpio);
  return Number.isFinite(n) ? n : null;
}

export const formatoNumero = (n: number, decimales = 0) =>
  n.toLocaleString("es-MX", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
