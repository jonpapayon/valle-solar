import { test } from "node:test";
import assert from "node:assert/strict";
import { estimarSistema, leerNumero, type ParametrosCalculo } from "./calculo.ts";
import { mensajeContacto, mensajeEstimacion, mensajeSinConsumo, urlWhatsApp } from "./whatsapp.ts";

const p: ParametrosCalculo = {
  diasPorPeriodo: { bimestral: 60, mensual: 30 },
  horasSolPico: 5.2,
  factorRendimiento: 0.8,
  potenciaPanelW: 550,
  consumoMaxKwh: 1_000_000,
};

test("estima a partir de kWh bimestrales", () => {
  const e = estimarSistema(1150, "bimestral", p)!;
  assert.ok(Math.abs(e.kwhDia - 19.1667) < 1e-3);
  assert.ok(Math.abs(e.kwp - 4.6074) < 1e-3);
  assert.equal(e.paneles, 9);
});

test("el periodo mensual usa 30 días", () => {
  const e = estimarSistema(600, "mensual", p)!;
  assert.equal(e.kwhDia, 20);
});

test("sin consumo válido no hay estimación", () => {
  for (const v of [null, 0, -5, Number.NaN, 2_000_000]) assert.equal(estimarSistema(v, "bimestral", p), null);
});

test("leerNumero entiende formatos mexicanos", () => {
  assert.equal(leerNumero("1,150"), 1150);
  assert.equal(leerNumero(" 1 150 kWh"), 1150);
  assert.equal(leerNumero("$4,800"), 4800);
  assert.equal(leerNumero("12.5"), 12.5);
  assert.equal(leerNumero(""), null);
  assert.equal(leerNumero("abc"), null);
  assert.equal(leerNumero("1.2.3"), null);
});

test("los mensajes de WhatsApp incluyen datos y estimación", () => {
  const datos = { periodo: "bimestral" as const, kwh: 1150, importe: 4800, tipo: "casa" as const, municipio: "Morelia" };
  const e = estimarSistema(1150, "bimestral", p)!;
  const m = mensajeEstimacion("Solar Service Mx", datos, e);
  assert.match(m, /Consumo: 1,150 kWh/);
  assert.match(m, /Importe del recibo: \$4,800/);
  assert.match(m, /Paneles aproximados: 9 de 550 W/);
  assert.match(m, /Municipio: Morelia/);
  assert.doesNotMatch(m, /ahorr/i);

  const s = mensajeSinConsumo("Solar Service Mx", { ...datos, kwh: null });
  assert.match(s, /No encuentro el consumo/);
  assert.doesNotMatch(s, /Consumo:/);

  const c = mensajeContacto("Solar Service Mx", { nombre: "Ana", tipo: "negocio", municipio: null, mensaje: null }, { datos, estimacion: e });
  assert.match(c, /Soy Ana/);
  assert.match(c, /Potencia aproximada: 4\.6 kWp/);
});

test("urlWhatsApp codifica el texto y usa el número oficial", () => {
  assert.equal(urlWhatsApp("523317061726"), "https://wa.me/523317061726");
  assert.equal(urlWhatsApp("523317061726", "Hola, ¿qué tal?"), "https://wa.me/523317061726?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F");
});

test("parámetros confirmados: panel de 630 W ≈ 2.62 kWh/día", async () => {
  const { parametrosCalculo, generacionPanelKwhDia, rangoPanelesW } = await import("../config/calculadora.ts");
  assert.equal(parametrosCalculo.potenciaPanelW, 630);
  assert.equal(parametrosCalculo.horasSolPico, 5.2);
  assert.equal(parametrosCalculo.factorRendimiento, 0.8);
  assert.equal(generacionPanelKwhDia.toFixed(2), "2.62");
  assert.deepEqual({ ...rangoPanelesW }, { min: 630, max: 715 });
  // 1,150 kWh bimestrales → 19.2 kWh/día → 4.6 kWp → 8 paneles de 630 W
  const e = estimarSistema(1150, "bimestral", parametrosCalculo)!;
  assert.equal(e.paneles, 8);
  assert.equal(e.potenciaPanelW, 630);
});
