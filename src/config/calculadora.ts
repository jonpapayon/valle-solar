import type { ParametrosCalculo } from "../lib/calculo.ts";

/**
 * Parámetros técnicos de la calculadora.
 *
 * Confirmados por el responsable de Solar Service Mx (10 de noviembre de 2026).
 * Cámbialos aquí y la calculadora entera (cálculo, textos y mensaje de WhatsApp) se actualiza.
 * La calculadora da una estimación orientativa: nunca debe presentarse como garantía de generación.
 */
export const parametrosCalculo: ParametrosCalculo = {
  /** Días usados para pasar el consumo del periodo a consumo diario. */
  diasPorPeriodo: { bimestral: 60, mensual: 30 },
  /** Horas solares pico de referencia. */
  horasSolPico: 5.2,
  /** Factor de rendimiento global del sistema (pérdidas). */
  factorRendimiento: 0.8,
  /** Potencia del panel de referencia, en W. */
  potenciaPanelW: 630,
  /** Límite de cordura para la entrada, en kWh por periodo. */
  consumoMaxKwh: 1_000_000,
};

/**
 * Rango habitual de paneles disponibles, en W (aprox.). Solo informativo: el cálculo usa `potenciaPanelW`.
 * Con paneles de mayor potencia el número de paneles puede ser menor.
 */
export const rangoPanelesW = { min: 630, max: 715 } as const;

/** Generación estimada de un panel de referencia, kWh/día (630 W × 5.2 h × 0.8 ≈ 2.62). */
export const generacionPanelKwhDia =
  (parametrosCalculo.potenciaPanelW / 1000) * parametrosCalculo.horasSolPico * parametrosCalculo.factorRendimiento;
