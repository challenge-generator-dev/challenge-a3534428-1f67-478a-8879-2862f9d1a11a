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