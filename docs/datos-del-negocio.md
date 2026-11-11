# Datos del negocio — confirmados y pendientes

Fuente única de lo que el sitio puede afirmar. Si un dato no está en «Confirmados», no se publica.
Última actualización: 10 de noviembre de 2026 (datos confirmados directamente por el responsable).

## Confirmados

| Tema | Dato | Dónde vive en el código |
| --- | --- | --- |
| Marca | Solar Service Mx | `src/data/empresa.ts` |
| WhatsApp | +52 33 1706 1726 (`wa.me/523317061726`), atendido por el responsable comercial y técnico | `src/data/empresa.ts` |
| Servicio | Sistemas fotovoltaicos interconectados a la red de CFE | `empresa.servicios` |
| Servicio | Sistemas híbridos con baterías, interconectados a la red | `empresa.servicios` |
| No se ofrece | Sistemas autónomos (aislados de la red) y bombeo solar | `empresa.noOfrece` |
| Clientes | Residenciales y comerciales | — |
| Trámite CFE | La empresa gestiona el trámite de interconexión ante CFE; está incluido en la cotización | `empresa.gestion` |
| Visita técnica | Sin costo adicional | `empresa.gestion` |
| Cobertura | Zamora, Tangancícuaro, Chilchota, Morelia, Los Reyes, Cotija, Sahuayo, Uruapan, Zacapu, La Piedad, Jacona, Purépero, Pátzcuaro, Quiroga y Charo | `empresa.municipios` |
| Cobertura (referencia) | Alrededor de 80 km desde Zamora y 40 km desde Morelia. **No es garantía**: fuera de la lista se confirma caso por caso | `empresa.coberturaAproximada` |
| Proyectos especiales | En algunos proyectos comerciales, industriales o con características eléctricas particulares puede requerirse verificación UVIE y trámites adicionales. No aplica a todos los negocios | FAQ y tarjeta «Negocio» |
| Calculadora | Panel de referencia 630 W; rango habitual 630–715 W; 5.2 horas solares pico; factor de rendimiento 0.8; un panel de 630 W ≈ 2.62 kWh/día | `src/config/calculadora.ts` |

Reglas que se mantienen: la calculadora es una estimación orientativa (nunca garantía de generación, ni
dimensionamiento, ni cotización); sin porcentajes ni montos de ahorro; el recibo depende del esquema de
interconexión.

## Pendientes (no inventar)

| Dato | Mientras tanto | Dónde se configurará |
| --- | --- | --- |
| Dominio definitivo | Sin canónica, sin `og:url`, sitemap vacío | `src/config/sitio.ts` → `dominio` (o `SITE_URL`) |
| Lanzamiento para buscadores | `noindex, nofollow` y `Disallow` en robots.txt | `src/config/sitio.ts` → `indexable` |
| Datos legales del aviso de privacidad (razón social, domicilio, revisión legal) | Borrador que describe el funcionamiento real del sitio | `src/pages/aviso-de-privacidad.astro` |
| Tiempos de instalación | No se mencionan | — |
| Logotipo oficial | Marca tipográfica provisional | `src/config/sitio.ts` → `logo`, `logoClaro` |
| Fotografías de instalaciones propias | Ilustraciones técnicas | `src/config/sitio.ts` → `fotos` |
| Esquemas de interconexión con los que se trabaja | Explicación general con la salvedad del esquema aplicable | Sección «Tu recibo» y FAQ |
| Horario de atención, correo, dirección | No se publican | `src/data/empresa.ts` |
