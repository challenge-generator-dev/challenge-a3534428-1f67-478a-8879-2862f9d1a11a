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