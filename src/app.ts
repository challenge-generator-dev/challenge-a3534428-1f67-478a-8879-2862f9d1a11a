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