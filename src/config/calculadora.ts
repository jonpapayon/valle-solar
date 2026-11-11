import type { ParametrosCalculo } from "../lib/calculo.ts";

/**
 * Parámetros técnicos de la calculadora.
 *
 * ⚠️ PENDIENTES DE VALIDACIÓN con el responsable técnico de Solar Service Mx.
 * Son valores preliminares para una estimación orientativa; cámbialos aquí
 * y la calculadora entera (cálculo, textos y mensaje de WhatsApp) se actualiza.
 */
export const parametrosCalculo: ParametrosCalculo = {
  /** Días usados para pasar el consumo del periodo a consumo diario. */
  diasPorPeriodo: { bimestral: 60, mensual: 30 },
  /** PENDIENTE: horas solar pico promedio de la zona de servicio. */
  horasSolPico: 5.2,
  /** PENDIENTE: factor de rendimiento global del sistema (pérdidas). */
  factorRendimiento: 0.8,
  /** PENDIENTE: potencia del panel que se instala habitualmente, en W. */
  potenciaPanelW: 550,
  /** Límite de cordura para la entrada, en kWh por periodo. */
  consumoMaxKwh: 1_000_000,
};
