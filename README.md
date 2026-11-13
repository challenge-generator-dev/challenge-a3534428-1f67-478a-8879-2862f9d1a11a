# Implementación de CRUD de productos en DynamoDB con Express

El sistema de gestión de inventario de una tienda en línea requiere la implementación de operaciones CRUD para productos almacenados en DynamoDB. Los productos tienen atributos como nombre, precio, stock y categoría. El sistema debe prohibir precios negativos y nombres duplicados. Además, debe manejar correctamente los errores y casos borde del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | crud-de-productos |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial y creación de productos

**Objetivo:** Implementar la funcionalidad básica para crear productos en DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configura el entorno de desarrollo con Express y DynamoDB.
- Implementa la ruta POST para crear un producto, asegurando que los nombres no sean duplicados y los precios no sean negativos.
- Verifica que la creación de productos funcione correctamente.

**Entregable:** Una API REST funcional que permite crear productos en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los errores de validación.
- Piensa en cómo estructurar la tabla de DynamoDB para los productos.

</details>

### Fase 2: Implementación de lectura, actualización y eliminación de productos

**Objetivo:** Extender la API para permitir la lectura, actualización y eliminación de productos.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementa las rutas GET, PUT y DELETE para productos.
- Asegura que las operaciones de actualización y eliminación respeten las reglas de validación establecidas.
- Verifica que todas las operaciones CRUD funcionen correctamente.

**Entregable:** Una API REST completa que permite crear, leer, actualizar y eliminar productos en DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo manejar los casos borde, como productos no encontrados.
- Piensa en cómo optimizar las consultas a DynamoDB.

</details>

### Fase 3: Pruebas unitarias y de integración

**Objetivo:** Cubrir las operaciones CRUD con pruebas unitarias y de integración usando Jest.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Escribe pruebas unitarias para cada ruta de la API.
- Implementa pruebas de integración para verificar el flujo completo de las operaciones CRUD.
- Asegura que todas las pruebas pasen correctamente.

**Entregable:** Un conjunto completo de pruebas unitarias y de integración para la API REST.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo simular los datos de DynamoDB en las pruebas.
- Piensa en cómo cubrir los casos de error en las pruebas.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se aplican en este reto?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el contexto de la gestión de inventario?
- **comoSeUsa**: ¿Cómo se usa la API REST para interactuar con los productos en DynamoDB?
- **erroresComunes**: ¿Cuáles son los errores comunes que pueden ocurrir al implementar las operaciones CRUD y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones de diseño implica la implementación de las operaciones CRUD en DynamoDB?

## Criterios de Evaluacion

- Implementación correcta de la ruta POST para crear productos.
- Implementación correcta de las rutas GET, PUT y DELETE para productos.
- Manejo adecuado de errores y casos borde en las operaciones CRUD.
- Pruebas unitarias y de integración completas y efectivas para la API REST.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | (raiz) | practice, chapter | server | Node | Express, DynamoDB, Jest |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `npm install --no-audit --no-fund && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /products`
  - `GET /products/:id`
  - `PUT /products/:id`
  - `DELETE /products/:id`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install --no-audit --no-fund && npm run build && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
