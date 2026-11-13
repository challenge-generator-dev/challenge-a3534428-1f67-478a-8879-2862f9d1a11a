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