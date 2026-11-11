#!/usr/bin/env node
/**
 * Exporta las piezas HTML de la campaña a PNG al tamaño exacto de su lienzo.
 *
 *   CHROME_PATH="/ruta/a/chrome" node marketing/meta-campaign/herramientas/render.mjs <pieza.html> [...]
 *
 * Cada HTML declara su tamaño con <meta name="lienzo" content="1080x1080">. El PNG se guarda junto al HTML,
 * con el mismo nombre. Usa Chrome/Chromium/Brave en modo headless por CDP, sin dependencias.
 * Las fuentes (Instrument Serif, Geist, Geist Mono) se cargan de Google Fonts: hace falta conexión.
 */
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const candidatos = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const navegador = candidatos.find((c) => existsSync(c));
if (!navegador) {
  console.error("No se encontró Chrome/Chromium. Define CHROME_PATH.");
  process.exit(1);
}

const piezas = process.argv.slice(2).map((p) => resolve(p));
if (!piezas.length) {
  console.error("Uso: node render.mjs <pieza.html> [...]");
  process.exit(1);
}

const puerto = 9400 + Math.floor(Math.random() * 400);
const perfil = mkdtempSync(join(tmpdir(), "ssmx-render-"));
const proc = spawn(navegador, ["--headless=new", `--remote-debugging-port=${puerto}`, `--user-data-dir=${perfil}`, "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 60 && !ws; i++) {
  try {
    const lista = await (await fetch(`http://127.0.0.1:${puerto}/json`)).json();
    const p = lista.find((x) => x.type === "page");
    if (p) ws = new WebSocket(p.webSocketDebuggerUrl);
  } catch {}
  if (!ws) await esperar(250);
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pendientes = new Map();
ws.addEventListener("message", (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pendientes.has(d.id)) { pendientes.get(d.id)(d); pendientes.delete(d.id); }
});
const cdp = (method, params = {}) => new Promise((r) => { const i = ++id; pendientes.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await cdp("Page.enable");
for (const pieza of piezas) {
  const html = readFileSync(pieza, "utf8");
  const m = html.match(/<meta name="lienzo" content="(\d+)x(\d+)"/);
  if (!m) { console.error(`Sin <meta name="lienzo"> en ${pieza}`); continue; }
  const [w, h] = [Number(m[1]), Number(m[2])];
  await cdp("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: false });
  await cdp("Page.navigate", { url: pathToFileURL(pieza).href });
  await esperar(600);
  await cdp("Runtime.evaluate", { expression: "document.fonts.ready.then(() => document.fonts.size)", awaitPromise: true });
  await esperar(400);
  const r = await cdp("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
  const salida = pieza.replace(/\.html$/, ".png");
  writeFileSync(salida, Buffer.from(r.result.data, "base64"));
  console.log(`✓ ${salida.split("/meta-campaign/")[1] ?? salida} (${w}×${h})`);
}
ws.close();
proc.kill();
process.exit(0);
