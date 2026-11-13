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