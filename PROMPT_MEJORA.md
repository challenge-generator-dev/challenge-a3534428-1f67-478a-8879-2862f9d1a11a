# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/infrastructure/config/dynamodb.ts` — La fase "Configuración inicial y creación de productos" se implementa aqui: este archivo es el ejercicio.
- `src/application/services/ProductService.ts` — La fase "Implementación de lectura, actualización y eliminación de productos" se implementa aqui: este archivo es el ejercicio.
- `src/tests/unit/services/ProductService.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.
- `src/tests/integration/controllers/ProductController.spec.ts` — El topic pide TDD/pruebas: este archivo es el ejercicio.

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

## Como saber que terminaste

```bash
npm install --no-audit --no-fund && npm run build && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de productos en DynamoDB expuesto por una API REST con Express y pruebas con Jest, Implementa operaciones CRUD de productos sobre DynamoDB con Express y las cubre con pruebas unitarias en Jest

### Misión / candidato
Persistir y consultar productos

### Reto
- Tema: crud-de-productos
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de productos en DynamoDB con Express
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de productos — objetivo: Implementar la funcionalidad básica para crear productos en DynamoDB. — entregable (NO resolver): Una API REST funcional que permite crear productos en DynamoDB.
- Fase 2: Implementación de lectura, actualización y eliminación de productos — objetivo: Extender la API para permitir la lectura, actualización y eliminación de productos. — entregable (NO resolver): Una API REST completa que permite crear, leer, actualizar y eliminar productos en DynamoDB.
- Fase 3: Pruebas unitarias y de integración — objetivo: Cubrir las operaciones CRUD con pruebas unitarias y de integración usando Jest. — entregable (NO resolver): Un conjunto completo de pruebas unitarias y de integración para la API REST.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "reto-express",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1168.0",
    "@aws-sdk/lib-dynamodb": "3.1168.0",
    "@types/aws-sdk": "2.7.4",
    "@types/jest": "30.0.0",
    "@types/supertest": "7.2.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "4.22.3",
    "jest": "30.5.2",
    "reflect-metadata": "0.2.2",
    "supertest": "7.3.2",
    "ts-jest": "29.4.15",
    "ts-node": "10.9.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": [
      "node"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.test.ts",
    "src/**/*.spec.ts"
  ]
}

// === ARCHIVO: src/domain/models/Product.ts ===
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
}

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    stock: number;

    @IsString()
    @IsNotEmpty()
    category: string;
}

export class UpdateProductDTO {
    @IsString()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name?: string;

    @IsNumber()
    @IsPositive()
    price?: number;

    @IsNumber()
    @IsPositive()
    stock?: number;

    @IsString()
    @IsNotEmpty({ message: 'Category cannot be empty' })
    category?: string;
}

// === ARCHIVO: src/domain/repositories/ProductRepository.ts ===
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/Product';

export interface ProductRepository {
    create(product: CreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: UpdateProductDTO): Promise<Product | null>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Product | null>;
}

// === ARCHIVO: src/application/services/ProductService.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/models/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductService {
    constructor(private productRepository: ProductRepository) {}

    async createProduct(productData: CreateProductDTO): Promise<Product> {
      throw new Error('TODO(reto): createProduct');
    }

    async getProduct(id: string): Promise<Product | null> {
      throw new Error('TODO(reto): getProduct');
    }

    async updateProduct(id: string, productData: UpdateProductDTO): Promise<Product | null> {
      throw new Error('TODO(reto): updateProduct');
    }

    async deleteProduct(id: string): Promise<void> {
      throw new Error('TODO(reto): deleteProduct');
    }
}

// === ARCHIVO: src/infrastructure/repositories/DynamoDBProductRepository.ts ===
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/models/Product';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

export class DynamoDBProductRepository implements ProductRepository {
    private client: DynamoDBDocumentClient;
    private tableName: string;

    constructor(client: DynamoDBDocumentClient, tableName: string) {
        this.client = client;
        this.tableName = tableName;
    }

    async create(product: CreateProductDTO): Promise<Product> {
        const id = this.generateId();
        const productWithId: Product = { id, ...product };

        await this.client.send(new PutCommand({
            TableName: this.tableName,
            Item: productWithId
        }));

        return productWithId;
    }

    async findById(id: string): Promise<Product | null> {
        const result = await this.client.send(new GetCommand({
            TableName: this.tableName,
            Key: { id }
        }));

        return result.Item ? result.Item as Product : null;
    }

    async update(id: string, product: UpdateProductDTO): Promise<Product | null> {
        const updateExpressionParts: string[] = [];
        const expressionAttributeValues: Record<string, unknown> = {};
        const expressionAttributeNames: Record<string, string> = {};

        Object.entries(product).forEach(([key, value]) => {
            if (value !== undefined) {
                updateExpressionParts.push(`#${key} = :${key}`);
                expressionAttributeNames[`#${key}`] = key;
                expressionAttributeValues[`:${key}`] = value;
            }
        });

        if (updateExpressionParts.length === 0) {
            throw new Error('No fields to update');
        }

        const updateExpression = `SET ${updateExpressionParts.join(', ')}`;

        const result = await this.client.send(new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'ALL_NEW'
        }));

        return result.Attributes ? result.Attributes as Product : null;
    }

    async delete(id: string): Promise<void> {
        await this.client.send(new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        }));
    }

    async findByName(name: string): Promise<Product | null> {
        throw new Error('Method not implemented. Requires GSI in DynamoDB');
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}

// === ARCHIVO: src/infrastructure/config/dynamodb.ts ===
// TODO(reto): Configurar cliente DynamoDB con variables de entorno
// Debe exportar una instancia de DynamoDBDocumentClient lista para usar
// y el nombre de la tabla de productos

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const dynamoDBClient: DynamoDBDocumentClient = {} as DynamoDBDocumentClient;
export const PRODUCTS_TABLE_NAME: string = '';

// === ARCHIVO: src/interfaces/controllers/ProductController.ts ===
import { Request, Response } from 'express';
import { ProductService } from '../../application/services/ProductService';
import { CreateProductDTO, UpdateProductDTO } from '../../domain/models/Product';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class ProductController {
    constructor(private productService: ProductService) {}

    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData = plainToClass(CreateProductDTO, req.body);
            const errors = await validate(productData);

            if (errors.length > 0) {
                res.status(400).json({
                    errors: errors.map(err => ({
                        property: err.property,
                        constraints: err.constraints
                    }))
                });
                return;
            }

            const product = await this.productService.createProduct(productData);
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                res.status(409).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async getProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const product = await this.productService.getProduct(id);

            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const productData = plainToClass(UpdateProductDTO, req.body);
            const errors = await validate(productData);

            if (errors.length > 0) {
                res.status(400).json({
                    errors: errors.map(err => ({
                        property: err.property,
                        constraints: err.constraints
                    }))
                });
                return;
            }

            const product = await this.productService.updateProduct(id, productData);

            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// === ARCHIVO: src/infrastructure/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, RequestHandlerParams } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export class AppError extends Error {
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Resource already exists') {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error') {
        super(message, 500);
    }
}

type ErrorRequestHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorRequestHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = (err as AppError).statusCode || 500;
    const message = err.message || 'Internal server error';
    const isOperational = (err as AppError).isOperational || false;

    console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.error(`Status: ${statusCode}, Message: ${message}`);
    console.error(`Stack: ${err.stack}`);
    console.error(`Is Operational: ${isOperational}`);

    if (process.env.NODE_ENV === 'production' && !isOperational) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred'
        });
        return;
    }

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandlerParams => {
    return (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: `Route ${req.method} ${req.originalUrl} not found`
    });
};

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
};

export const handleUnhandledRejections = (): void => {
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
        console.error(`[UNHANDLED REJECTION] ${new Date().toISOString()}`);
        console.error('Reason:', reason);
        console.error('Promise:', promise);
    });
};

export const handleUncaughtExceptions = (): void => {
    process.on('uncaughtException', (error: Error) => {
        console.error(`[UNCAUGHT EXCEPTION] ${new Date().toISOString()}`);
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    });
};

// === ARCHIVO: src/infrastructure/middlewares/validation.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate as classValidate, ValidationError as ClassValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export interface ValidationOptions {
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    skipMissingProperties?: boolean;
    groups?: string[];
    dismissDefaultMessages?: boolean;
    validationError?: {
        target?: boolean;
        value?: boolean;
    };
    stopAtFirstError?: boolean;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationErrorItem[];
}

export interface ValidationErrorItem {
    property: string;
    value: any;
    constraints: Record<string, string>;
    children?: ValidationErrorItem[];
}

export const validate = async <T extends object>(
    type: ClassConstructor<T>,
    obj: any,
    options: ValidationOptions = {}
): Promise<ValidationResult> => {
    const instance = plainToInstance(type, obj);
    
    const validationOptions = {
        whitelist: options.whitelist ?? true,
        forbidNonWhitelisted: options.forbidNonWhitelisted ?? true,
        skipMissingProperties: options.skipMissingProperties ?? false,
        groups: options.groups,
        dismissDefaultMessages: options.dismissDefaultMessages ?? false,
        validationError: options.validationError ?? { target: false, value: true },
        stopAtFirstError: options.stopAtFirstError ?? false
    };

    const errors = await classValidate(instance, validationOptions);
    
    const formattedErrors: ValidationErrorItem[] = errors.map((error: ClassValidationError) => ({
        property: error.property,
        value: error.value,
        constraints: error.constraints || {},
        children: error.children?.map(child => ({
            property: child.property,
            value: child.value,
            constraints: child.constraints || {},
            children: child.children?.map(grandChild => ({
                property: grandChild.property,
                value: grandChild.value,
                constraints: grandChild.constraints || {}
            }))
        }))
    }));

    return {
        valid: errors.length === 0,
        errors: formattedErrors
    };
};

export const validateBody = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.body, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateParams = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.params, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Invalid parameters',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateQuery = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.query, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Invalid query parameters',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const createValidatorMiddleware = <T extends object>(
    type: ClassConstructor<T>,
    source: 'body' | 'params' | 'query' = 'body',
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req[source];
            const result = await validate(type, data, options);
            
            if (!result.valid) {
                const errorMessages = result.errors.map(err => 
                    `${err.property}: ${Object.values(err.constraints).join(', ')}`
                );
                
                res.status(400).json({
                    error: `Validation failed for ${source}`,
                    messages: errorMessages,
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateProductBody = createValidatorMiddleware(
    require('../../domain/models/Product').CreateProductDTO,
    'body',
    { whitelist: true, forbidNonWhitelisted: true }
);

export const validateProductUpdateBody = createValidatorMiddleware(
    require('../../domain/models/Product').UpdateProductDTO,
    'body',
    { whitelist: true, forbidNonWhitelisted: false, skipMissingProperties: true }
);

export const validation = validate;

// === ARCHIVO: src/main.ts ===
import 'reflect-metadata';
import express from 'express';
import { app } from './app';
import { ProductController } from './interfaces/controllers/ProductController';
import { DynamoDBProductRepository } from './infrastructure/repositories/DynamoDBProductRepository';
import { ProductService } from './application/services/ProductService';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const PORT = process.env.PORT || 3000;

const initializeDependencies = () => {
    const awsConfig = {
        region: process.env.AWS_REGION || 'us-east-1',
        ...(process.env.AWS_ENDPOINT && { endpoint: process.env.AWS_ENDPOINT })
    };

    const client = new DynamoDBClient(awsConfig);
    const docClient = DynamoDBDocumentClient.from(client, {
        marshallOptions: {
            removeUndefinedValues: true
        }
    });

    const tableName = process.env.DYNAMODB_TABLE || 'products';
    const productRepository = new DynamoDBProductRepository(docClient, tableName);
    const productService = new ProductService(productRepository);

    return { productService };
};

const { productService } = initializeDependencies();
const productController = new ProductController(productService);

app.post('/products', (req, res) => productController.createProduct(req, res));
app.get('/products/:id', (req, res) => productController.getProduct(req, res));
app.put('/products/:id', (req, res) => productController.updateProduct(req, res));
app.delete('/products/:id', (req, res) => productController.deleteProduct(req, res));

const server = app.listen(PORT, () => {
    console.log(`[SERVER] Servidor iniciado en puerto ${PORT}`);
    console.log(`[SERVER] Entorno: ${process.env.NODE_ENV || 'development'}`);
});

process.on('SIGTERM', () => {
    console.log('[SERVER] Señal SIGTERM recibida, cerrando servidor...');
    server.close(() => {
        console.log('[SERVER] Servidor cerrado correctamente');
        process.exit(0);
    });
});

export default server;

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { validateProductBody, validateProductUpdateBody } from './infrastructure/middlewares/validation';

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[REQUEST] ${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.post('/products', validateProductBody, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ProductService } = await import('./application/services/ProductService');
        const { DynamoDBProductRepository } = await import('./infrastructure/repositories/DynamoDBProductRepository');
        const { createDynamoDBClient } = await import('./infrastructure/config/dynamodb');
        
        const client = createDynamoDBClient();
        const repository = new DynamoDBProductRepository(client, process.env.DYNAMODB_TABLE || 'products');
        const service = new ProductService(repository);
        
        const product = await service.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
});

app.get('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ProductService } = await import('./application/services/ProductService');
        const { DynamoDBProductRepository } = await import('./infrastructure/repositories/DynamoDBProductRepository');
        const { createDynamoDBClient } = await import('./infrastructure/config/dynamodb');
        
        const client = createDynamoDBClient();
        const repository = new DynamoDBProductRepository(client, process.env.DYNAMODB_TABLE || 'products');
        const service = new ProductService(repository);
        
        const product = await service.getProduct(req.params.id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

app.put('/products/:id', validateProductUpdateBody, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ProductService } = await import('./application/services/ProductService');
        const { DynamoDBProductRepository } = await import('./infrastructure/repositories/DynamoDBProductRepository');
        const { createDynamoDBClient } = await import('./infrastructure/config/dynamodb');
        
        const client = createDynamoDBClient();
        const repository = new DynamoDBProductRepository(client, process.env.DYNAMODB_TABLE || 'products');
        const service = new ProductService(repository);
        
        const product = await service.updateProduct(req.params.id, req.body);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
});

app.delete('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ProductService } = await import('./application/services/ProductService');
        const { DynamoDBProductRepository } = await import('./infrastructure/repositories/DynamoDBProductRepository');
        const { createDynamoDBClient } = await import('./infrastructure/config/dynamodb');
        
        const client = createDynamoDBClient();
        const repository = new DynamoDBProductRepository(client, process.env.DYNAMODB_TABLE || 'products');
        const service = new ProductService(repository);
        
        await service.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler);

// === ARCHIVO: src/tests/integration/controllers/ProductController.spec.ts ===
import request from 'supertest';
import { app } from '../../../app';
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CreateProductDTO, UpdateProductDTO, Product } from '../../../domain/models/Product';

describe('ProductController - Integración', () => {
    let productService: ProductService;
    let productRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        productRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByName: jest.fn()
        } as jest.Mocked<ProductRepository>;

        productService = new ProductService(productRepository);
    });

    describe('POST /products', () => {
        it('TODO(reto): debe crear un producto exitosamente', async () => {
            
        });

        it('TODO(reto): debe retornar 400 cuando el nombre está vacío', async () => {
            
        });

        it('TODO(reto): debe retornar 400 cuando el precio es negativo', async () => {
            
        });

        it('TODO(reto): debe retornar 409 cuando el producto ya existe', async () => {
            
        });
    });

    describe('GET /products/:id', () => {
        it('TODO(reto): debe retornar un producto por ID', async () => {
            
        });

        it('TODO(reto): debe retornar 404 cuando el producto no existe', async () => {
            
        });
    });

    describe('PUT /products/:id', () => {
        it('TODO(reto): debe actualizar un producto exitosamente', async () => {
            
        });

        it('TODO(reto): debe retornar 404 cuando el producto no existe', async () => {
            
        });
    });

    describe('DELETE /products/:id', () => {
        it('TODO(reto): debe eliminar un producto exitosamente', async () => {
            
        });

        it('TODO(reto): debe manejar errores al eliminar', async () => {
            
        });
    });
});

// === ARCHIVO: src/tests/unit/services/ProductService.spec.ts ===
import { ProductService } from '../../../application/services/ProductService';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CreateProductDTO, UpdateProductDTO, Product } from '../../../domain/models/Product';

describe('ProductService', () => {
    let productService: ProductService;
    let mockProductRepository: jest.Mocked<ProductRepository>;

    beforeEach(() => {
        mockProductRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByName: jest.fn()
        } as jest.Mocked<ProductRepository>;

        productService = new ProductService(mockProductRepository);
    });

    describe('createProduct', () => {
        it.skip('TODO(reto): should create a product successfully', async () => {
            const createProductDTO: CreateProductDTO = {
                name: 'Test Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            };

            const mockProduct: Product = {
                id: '123',
                ...createProductDTO
            };

            mockProductRepository.findByName.mockResolvedValue(null);
            mockProductRepository.create.mockResolvedValue(mockProduct);

            const result = await productService.createProduct(createProductDTO);
        });

        it.skip('TODO(reto): should throw error when product name already exists', async () => {
            const createProductDTO: CreateProductDTO = {
                name: 'Existing Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            };

            const existingProduct: Product = {
                id: '456',
                name: 'Existing Product',
                price: 50,
                stock: 5,
                category: 'Electronics'
            };

            mockProductRepository.findByName.mockResolvedValue(existingProduct);
        });

        it.skip('TODO(reto): should throw error for negative price', async () => {
            const createProductDTO: CreateProductDTO = {
                name: 'Test Product',
                price: -10,
                stock: 10,
                category: 'Electronics'
            };
        });

        it.skip('TODO(reto): should throw error for negative stock', async () => {
            const createProductDTO: CreateProductDTO = {
                name: 'Test Product',
                price: 100,
                stock: -5,
                category: 'Electronics'
            };
        });
    });

    describe('getProduct', () => {
        it.skip('TODO(reto): should return product when found', async () => {
            const productId = '123';
            const mockProduct: Product = {
                id: productId,
                name: 'Test Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            };

            mockProductRepository.findById.mockResolvedValue(mockProduct);

            const result = await productService.getProduct(productId);
        });

        it.skip('TODO(reto): should return null when product not found', async () => {
            const productId = 'non-existent-id';

            mockProductRepository.findById.mockResolvedValue(null);

            const result = await productService.getProduct(productId);
        });
    });

    describe('updateProduct', () => {
        it.skip('TODO(reto): should update product successfully', async () => {
            const productId = '123';
            const updateProductDTO: UpdateProductDTO = {
                name: 'Updated Product',
                price: 150
            };

            const updatedProduct: Product = {
                id: productId,
                name: 'Updated Product',
                price: 150,
                stock: 10,
                category: 'Electronics'
            };

            mockProductRepository.findById.mockResolvedValue({
                id: productId,
                name: 'Old Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            });
            mockProductRepository.update.mockResolvedValue(updatedProduct);

            const result = await productService.updateProduct(productId, updateProductDTO);
        });

        it.skip('TODO(reto): should return null when product not found', async () => {
            const productId = 'non-existent-id';
            const updateProductDTO: UpdateProductDTO = {
                name: 'Updated Product'
            };

            mockProductRepository.findById.mockResolvedValue(null);

            const result = await productService.updateProduct(productId, updateProductDTO);
        });

        it.skip('TODO(reto): should throw error when updating to existing name', async () => {
            const productId = '123';
            const updateProductDTO: UpdateProductDTO = {
                name: 'Existing Product'
            };

            mockProductRepository.findById.mockResolvedValue({
                id: productId,
                name: 'Current Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            });
            mockProductRepository.findByName.mockResolvedValue({
                id: '456',
                name: 'Existing Product',
                price: 50,
                stock: 5,
                category: 'Electronics'
            });
        });
    });

    describe('deleteProduct', () => {
        it.skip('TODO(reto): should delete product successfully', async () => {
            const productId = '123';

            mockProductRepository.findById.mockResolvedValue({
                id: productId,
                name: 'Test Product',
                price: 100,
                stock: 10,
                category: 'Electronics'
            });
            mockProductRepository.delete.mockResolvedValue();

            await productService.deleteProduct(productId);
        });

        it.skip('TODO(reto): should throw error when product not found', async () => {
            const productId = 'non-existent-id';

            mockProductRepository.findById.mockResolvedValue(null);

            await expect(productService.deleteProduct(productId)).rejects.toThrow();
        });
    });
});

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
