# Campaña Meta Ads — Solar Service Mx

Campaña de clic a WhatsApp (+52 33 1706 1726) para Facebook e Instagram. Mismo sistema visual que el sitio
(«Oficio en el valle»): Instrument Serif, Geist y Geist Mono; Cal, Basalto, Valle y Tezontle.
Esta carpeta es independiente del sitio: no forma parte del build de Astro.

## Estado

**Fase 1 — propuestas (en revisión).** Una pieza cuadrada 1080 × 1080 por concepto y sus textos.
Las adaptaciones 1080 × 1350 y 1080 × 1920 se producen cuando se elijan y ajusten las propuestas.

| Concepto | Dirección | Pieza |
| --- | --- | --- |
| 01 · El recibo de luz | Editorial sobre Cal: titular protagonista, recibo en papel, valle y sol | `propuestas/01-recibo/cuadrado-1080x1080.png` |
| 02 · Tu propio sistema solar | Técnica sobre Valle: alzado del sistema con flujos de energía y piezas numeradas | `propuestas/02-sistema/cuadrado-1080x1080.png` |
| 03 · Energía para tu negocio | Lámina sobre Basalto: plano en planta de un techo comercial con módulos | `propuestas/03-negocio/cuadrado-1080x1080.png` |

- Tablero comparativo: `revision.png`
- Textos (principal, titular, descripción, botón, mensaje prellenado, variantes A/B): `copies.md`

## Estructura

```
marketing/meta-campaign/
├── README.md
├── copies.md
├── revision.html / revision.png     Tablero de las tres propuestas
├── fuentes/marca.css                Tokens, fuentes, marca y bloque de WhatsApp compartidos
├── herramientas/render.mjs          Exporta cada HTML a PNG al tamaño exacto
└── propuestas/
    ├── 01-recibo/cuadrado-1080x1080.{html,png}
    ├── 02-sistema/cuadrado-1080x1080.{html,png}
    └── 03-negocio/cuadrado-1080x1080.{html,png}
```

## Exportar

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node marketing/meta-campaign/herramientas/render.mjs marketing/meta-campaign/propuestas/*/*.html marketing/meta-campaign/revision.html
```

Cada HTML declara su tamaño con `<meta name="lienzo" content="1080x1080">`. Las fuentes se cargan de Google Fonts.

## Reglas de la campaña

- Sin porcentajes, montos ni promesas de eliminar el recibo de CFE.
- Sin instalaciones, testimonios ni cifras inventadas; sin fotografías de instalaciones ajenas.
  Todas las imágenes son ilustraciones técnicas genéricas, marcadas como ilustrativas donde corresponde.
- Solo sistemas interconectados a CFE (también híbridos con baterías, interconectados a la red); nada de autónomos ni bombeo solar.
- Datos del negocio actualizados en `docs/datos-del-negocio.md` (municipios, trámite CFE incluido, visita sin costo).
- CFE se menciona como la red a la que se conecta el sistema; nunca se usa su logotipo ni su imagen.
- Marca: logotipo provisional (el mismo del sitio) hasta recibir el oficial.
