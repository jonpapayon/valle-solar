import type { Estimacion } from "./calculo";
import type { DatosCalculadora } from "./whatsapp";

export interface CalculoGuardado {
  datos: DatosCalculadora;
  estimacion: Estimacion;
}

const CLAVE = "ssmx-calculo";
const EVENTO = "ssmx:calculo";

/** Abre WhatsApp en una pestaña nueva; si el navegador la bloquea, navega en la misma. */
export function abrirWhatsApp(url: string) {
  const w = window.open(url, "_blank");
  if (w) w.opener = null;
  else window.location.href = url;
}

/** Conserva la última estimación para que el formulario de contacto pueda incluirla. */
export function guardarCalculo(c: CalculoGuardado | null) {
  try {
    if (c) sessionStorage.setItem(CLAVE, JSON.stringify(c));
    else sessionStorage.removeItem(CLAVE);
  } catch {
    /* almacenamiento no disponible: solo se pierde la memoria entre recargas */
  }
  (window as unknown as { __ssmxCalculo?: CalculoGuardado | null }).__ssmxCalculo = c;
  window.dispatchEvent(new CustomEvent(EVENTO, { detail: c }));
}

export function leerCalculo(): CalculoGuardado | null {
  const enMemoria = (window as unknown as { __ssmxCalculo?: CalculoGuardado | null }).__ssmxCalculo;
  if (enMemoria !== undefined) return enMemoria;
  try {
    const t = sessionStorage.getItem(CLAVE);
    return t ? (JSON.parse(t) as CalculoGuardado) : null;
  } catch {
    return null;
  }
}

export function alCambiarCalculo(fn: (c: CalculoGuardado | null) => void) {
  window.addEventListener(EVENTO, (e) => fn((e as CustomEvent<CalculoGuardado | null>).detail));
}
