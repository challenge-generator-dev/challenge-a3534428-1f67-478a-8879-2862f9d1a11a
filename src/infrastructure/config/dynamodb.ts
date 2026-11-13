// TODO(reto): Configurar cliente DynamoDB con variables de entorno
// Debe exportar una instancia de DynamoDBDocumentClient lista para usar
// y el nombre de la tabla de productos

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const dynamoDBClient: DynamoDBDocumentClient = {} as DynamoDBDocumentClient;
export const PRODUCTS_TABLE_NAME: string = '';