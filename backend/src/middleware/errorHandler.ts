import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/error';

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = error.message;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  const errorResponse: ErrorResponse = {
    error: error.name || 'Error',
    message,
    statusCode,
    timestamp: new Date().toISOString()
  };

  // Log error for debugging
  console.error('Error occurred:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query
  });

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (req: Request, res: Response): void => {
  const errorResponse: ErrorResponse = {
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404,
    timestamp: new Date().toISOString()
  };

  res.status(404).json(errorResponse);
};
