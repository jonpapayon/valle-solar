# Solar Service Mx — sitio web

Sitio estático en Astro 7 + Tailwind 4. Dirección visual «Oficio en el valle».

## Comandos

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor local |
| `npm run build` | Compila a `dist/` |
| `npm run preview` | Sirve el build |
| `npm test` | Pruebas de la calculadora y los mensajes de WhatsApp |

## Dónde se ajusta cada cosa

- **Datos de la empresa** (nombre, WhatsApp, servicios, gestión, municipios de cobertura): `src/data/empresa.ts`. Solo datos confirmados.
- **Parámetros de la calculadora** (panel de referencia 630 W, rango 630–715 W, 5.2 HSP, factor 0.8, días por periodo): `src/config/calculadora.ts`. Confirmados por el responsable.
- **Datos confirmados y pendientes del negocio**: `docs/datos-del-negocio.md`.
- **Lógica de cálculo**: `src/lib/calculo.ts` (solo kWh; nunca convierte pesos a kWh).
- **Mensajes de WhatsApp**: `src/lib/whatsapp.ts`.
- **Dominio, logotipo y fotografías**: `src/config/sitio.ts`.
  - `dominio`: con él se generan canónica, `og:url`, sitemap y la línea Sitemap de `robots.txt`. La variable de entorno `SITE_URL` tiene prioridad.
  - `logo` / `logoClaro`: archivo en `public/` (SVG preferible). Mientras sea `null` se usa la marca tipográfica.
  - `fotos.casa` / `fotos.negocio`: fotografías reales de instalaciones (con permiso). Mientras sean `null` se muestran las ilustraciones técnicas. Nunca fotos de stock.
- **Aviso de privacidad**: `src/pages/aviso-de-privacidad.astro` (borrador pendiente de revisión legal).

## Secciones

`src/components/`:

| Componente | Contenido |
| --- | --- |
| `Encabezado`, `Marca` | Navegación fija y marca (logotipo cuando exista) |
| `Hero` + `Calculadora` | Propuesta de valor y «Lámina 01»: plano de techo que se llena con los módulos estimados y cajetín con los datos |
| `PerfilValle` | Motivo de marca: perfil del valle en línea fina (hero y pie) |
| `Servicio` | Ficha técnica de alcance: lo que se instala y lo que no |
| `Diagrama` | Alzado del sistema con estados «De día», «Si sobra» y «De noche» (solo CSS) |
| `Recibo` | Medidor bidireccional ilustrado y aviso sobre el esquema de interconexión |
| `Soluciones` | Casa y negocio, con espacio para fotografía real |
| `Proceso`, `Preguntas`, `Contacto`, `PiePagina` | Pasos, preguntas frecuentes, formulario a WhatsApp y cierre |

## Revisión del skill de diseño

Resultado del gate y excepciones deliberadas: `docs/excepciones-skill.md`.
