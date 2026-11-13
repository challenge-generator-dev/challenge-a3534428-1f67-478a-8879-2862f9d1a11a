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