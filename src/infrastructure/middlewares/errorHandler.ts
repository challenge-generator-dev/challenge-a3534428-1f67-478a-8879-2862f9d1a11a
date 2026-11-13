import { Request, Response, NextFunction, RequestHandlerParams } from 'express';

export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export class AppError extends Error {
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, 404);
    }
}

export class ValidationError extends AppError {
    constructor(message: string = 'Validation failed') {
        super(message, 400);
    }
}

export class ConflictError extends AppError {
    constructor(message: string = 'Resource already exists') {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized access') {
        super(message, 401);
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, 403);
    }
}

export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error') {
        super(message, 500);
    }
}

type ErrorRequestHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction) => void;

export const errorHandler: ErrorRequestHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = (err as AppError).statusCode || 500;
    const message = err.message || 'Internal server error';
    const isOperational = (err as AppError).isOperational || false;

    console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.error(`Status: ${statusCode}, Message: ${message}`);
    console.error(`Stack: ${err.stack}`);
    console.error(`Is Operational: ${isOperational}`);

    if (process.env.NODE_ENV === 'production' && !isOperational) {
        res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred'
        });
        return;
    }

    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
};

export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandlerParams => {
    return (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const notFoundHandler = (req: Request, res: Response): void => {
    res.status(404).json({
        error: `Route ${req.method} ${req.originalUrl} not found`
    });
};

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[REQUEST] ${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    });
    
    next();
};

export const handleUnhandledRejections = (): void => {
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
        console.error(`[UNHANDLED REJECTION] ${new Date().toISOString()}`);
        console.error('Reason:', reason);
        console.error('Promise:', promise);
    });
};

export const handleUncaughtExceptions = (): void => {
    process.on('uncaughtException', (error: Error) => {
        console.error(`[UNCAUGHT EXCEPTION] ${new Date().toISOString()}`);
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        process.exit(1);
    });
};