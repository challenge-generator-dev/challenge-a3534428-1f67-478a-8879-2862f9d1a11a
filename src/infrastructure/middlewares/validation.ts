import { Request, Response, NextFunction, RequestHandler } from 'express';
import { validate as classValidate, ValidationError as ClassValidationError } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

export interface ValidationOptions {
    whitelist?: boolean;
    forbidNonWhitelisted?: boolean;
    skipMissingProperties?: boolean;
    groups?: string[];
    dismissDefaultMessages?: boolean;
    validationError?: {
        target?: boolean;
        value?: boolean;
    };
    stopAtFirstError?: boolean;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationErrorItem[];
}

export interface ValidationErrorItem {
    property: string;
    value: any;
    constraints: Record<string, string>;
    children?: ValidationErrorItem[];
}

export const validate = async <T extends object>(
    type: ClassConstructor<T>,
    obj: any,
    options: ValidationOptions = {}
): Promise<ValidationResult> => {
    const instance = plainToInstance(type, obj);
    
    const validationOptions = {
        whitelist: options.whitelist ?? true,
        forbidNonWhitelisted: options.forbidNonWhitelisted ?? true,
        skipMissingProperties: options.skipMissingProperties ?? false,
        groups: options.groups,
        dismissDefaultMessages: options.dismissDefaultMessages ?? false,
        validationError: options.validationError ?? { target: false, value: true },
        stopAtFirstError: options.stopAtFirstError ?? false
    };

    const errors = await classValidate(instance, validationOptions);
    
    const formattedErrors: ValidationErrorItem[] = errors.map((error: ClassValidationError) => ({
        property: error.property,
        value: error.value,
        constraints: error.constraints || {},
        children: error.children?.map(child => ({
            property: child.property,
            value: child.value,
            constraints: child.constraints || {},
            children: child.children?.map(grandChild => ({
                property: grandChild.property,
                value: grandChild.value,
                constraints: grandChild.constraints || {}
            }))
        }))
    }));

    return {
        valid: errors.length === 0,
        errors: formattedErrors
    };
};

export const validateBody = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.body, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Validation failed',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateParams = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.params, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Invalid parameters',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateQuery = <T extends object>(
    type: ClassConstructor<T>,
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await validate(type, req.query, options);
            
            if (!result.valid) {
                res.status(400).json({
                    error: 'Invalid query parameters',
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const createValidatorMiddleware = <T extends object>(
    type: ClassConstructor<T>,
    source: 'body' | 'params' | 'query' = 'body',
    options?: ValidationOptions
): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req[source];
            const result = await validate(type, data, options);
            
            if (!result.valid) {
                const errorMessages = result.errors.map(err => 
                    `${err.property}: ${Object.values(err.constraints).join(', ')}`
                );
                
                res.status(400).json({
                    error: `Validation failed for ${source}`,
                    messages: errorMessages,
                    details: result.errors
                });
                return;
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateProductBody = createValidatorMiddleware(
    require('../../domain/models/Product').CreateProductDTO,
    'body',
    { whitelist: true, forbidNonWhitelisted: true }
);

export const validateProductUpdateBody = createValidatorMiddleware(
    require('../../domain/models/Product').UpdateProductDTO,
    'body',
    { whitelist: true, forbidNonWhitelisted: false, skipMissingProperties: true }
);

export const validation = validate;