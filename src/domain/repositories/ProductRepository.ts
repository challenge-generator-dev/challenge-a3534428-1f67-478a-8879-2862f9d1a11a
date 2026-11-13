import { Product, CreateProductDTO, UpdateProductDTO } from '../models/Product';

export interface ProductRepository {
    create(product: CreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    update(id: string, product: UpdateProductDTO): Promise<Product | null>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Product | null>;
}