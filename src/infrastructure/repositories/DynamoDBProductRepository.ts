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