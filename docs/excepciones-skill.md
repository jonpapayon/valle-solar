# Revisión del gate de `design-taste-frontend` — rediseño «Oficio en el valle»

Fecha: 10 de noviembre de 2026 · Página revisada: `dist/index.html` (build de producción del rediseño completo).

## Resultado real del gate

| Ejecución | Resultado |
| --- | --- |
| Ronda 1 (rediseño recién terminado) | `GATE: FAIL 92` |
| Ronda 2 (tras corregir problemas reales) | `GATE: FAIL 85` |
| Ronda 3 (última permitida) | **`GATE: OPEN 83 (rounds used up)`**, 2 hallazgos con waiver (`WAIVED`) |

**El gate no pasa.** `OPEN` significa que se agotaron las rondas con hallazgos abiertos; no es un PASS.
No se ocultó nada al checker ni se editó el kit. El gate admite como máximo 5 waivers (uno por hallazgo), así que
las excepciones se documentan aquí.

La dirección visual aprobada («Oficio en el valle») tiene prioridad sobre las reglas automáticas del skill: no se
imponen alturas rígidas de pantalla, no se usan fotografías de stock y no se añaden animaciones decorativas para
satisfacerlo.

## 1. Problemas reales — corregidos en este rediseño

| Hallazgo | Problema | Corrección |
| --- | --- | --- |
| `off-viewport` ×2 (320 px) | El medidor ilustrado de «Tu recibo» provocaba desplazamiento horizontal de la página | Columnas con `minmax(0, 1fr)`, dígitos y rellenos que se reducen por debajo de 400 px |
| `focus-visible` (radios del diagrama) | El anillo de foco tenía 1.8:1 sobre la opción activa | Anillo interior: basalto sobre la opción activa, `#f0a27f` sobre las demás. Comprobado con Tab |
| `copy-actions` (390 px) | Tres acciones en el hero del móvil | «Ver cómo funciona» solo en escritorio; en móvil quedan «Calcular mi sistema» y el botón de la lámina |
| `button-styles` | Había un tercer estilo de botón (relleno claro) | Eliminado: un primario (tezontle) y un secundario (contorno) |
| `heading-scale` / `one-heading` | El título de la lámina era un `h2` de 13 px dentro del hero | Ahora es texto que da nombre al formulario (`aria-labelledby`); el hero solo tiene su `h1` |
| `heading-scale` (390 px) | Títulos «Casa» / «Negocio» tan grandes como un `h2` | Reducidos a 32 px en móvil |
| `off-grid` ×2, `lines` | Medidor centrado fuera del margen; entradilla del diagrama fuera de la columna de controles | Medidor alineado al margen en escritorio; entradilla en la misma columna que los controles |

Correcciones de la ronda anterior que siguen vigentes: contraste del texto secundario (≥ 7:1), foco visible en los
selectores segmentados, encabezado sin desbordar en 390 px, unidades de los campos ocultas para lectores de pantalla.

## 2. Falsos positivos — 50 hallazgos (2 con waiver)

| Hallazgos | Por qué son falsos |
| --- | --- |
| `edge-left` ×39, `edge-right` ×1 | El checker exige que cada bloque empiece en el margen o en una columna de **su** rejilla. Todos los señalados son contenido interior de tarjetas, celdas de la lámina o columnas derechas de la rejilla de 12 columnas de Tailwind (calculadora, ficha técnica, controles del diagrama, tarjetas, formulario, pie). Los bordes exteriores de contenido son iguales en todas las secciones (80 / 1360 px a 1440) |
| `container-edges` ×6 (+1 `WAIVED`) | El `.wrap` usa `padding-inline` en vez de `margin`; el checker mide el contenedor como 0–1440 px. Incluye que el pie es `footer` y no `footer.closing` del kit |
| `row-lines` ×3 | Mide las filas contra 0–1440 px en lugar de los bordes reales de contenido |
| `off-grid` ×1 (390 px) | Las opciones del selector segmentado están 4 px dentro de su propio fondo, por diseño del control |
| `copy-headings` (`WAIVED`) | «Inversor», «Tablero», «Medidor bidireccional» son nombres de componentes: sí nombran una parte |

## 3. Excepciones de diseño deliberadas — 33 hallazgos

Decisiones conscientes, **no errores**.

| Hallazgos | Regla del skill | Decisión |
| --- | --- | --- |
| `section-height` ×5, `screen-height` ×2, `screen-short` ×1, `one-section` ×3, `neighbour` ×3, `neighbour-ground` ×1, `hero-screen` ×1, `hero-fold` ×1, `one-heading` ×1, `section-gaps` ×1 | Cada sección mide exactamente una o dos pantallas, sin asomar la siguiente; separación uniforme | Las secciones crecen con su contenido, que cambiará con los datos del responsable. El hero incluye la lámina completa de la calculadora (más de una pantalla en escritorio por decisión de diseño). Contacto y pie comparten el fondo basalto como un único cierre, por eso su separación es menor |
| `no-visual` ×2, `text-only` ×1, `moment-none` ×1 | Foto, icono o maqueta en cada sección; un «momento» animado por página | Sin fotografías propias y sin fotos de stock que puedan parecer instalaciones de la empresa. Los visuales son técnicos: la lámina con el plano del techo, el diagrama en alzado con tres estados, el medidor ilustrado y las ilustraciones de casa y nave. Proceso, preguntas y contacto se resuelven con tipografía |
| `split-pair` ×5 | Columnas siempre alineadas arriba, texto a la izquierda y visual a la derecha | Composición editorial: el diagrama ocupa la izquierda con sus controles a la derecha; el medidor va a la izquierda del texto; las entradillas se alinean abajo con su título |
| `heading-scale` ×2 | Un solo tamaño por nivel | Los `h2` de apertura (Servicio, Diagrama, Contacto) son más grandes que los de las demás secciones para marcar el ritmo editorial. Los `h3` tienen tres contextos: partes del diagrama, pasos y tarjetas |
| `button-styles` ×2 | Un estilo de botón primario y uno secundario | Ya hay solo dos estilos; el checker cuenta el secundario invertido (contorno claro sobre la tarjeta oscura de «Negocio») como un tercero |
| `phone-number` ×1 | No mostrar teléfonos con formato real | Es el WhatsApp oficial confirmado de la empresa (+52 33 1706 1726) |

## Cómo volver a comprobarlo

```bash
npm run build
CHROME_PATH="/ruta/a/chromium" node .claude/skills/design-taste-frontend/scripts/gate.mjs --start dist/index.html --root dist --kind service
CHROME_PATH="/ruta/a/chromium" node .claude/skills/design-taste-frontend/scripts/gate.mjs
```

Los informes y capturas del gate quedan en `.taste-skill/` (fuera de git).
