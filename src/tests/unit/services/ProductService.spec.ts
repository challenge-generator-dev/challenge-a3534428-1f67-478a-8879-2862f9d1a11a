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