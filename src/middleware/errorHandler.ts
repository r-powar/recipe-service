import { Request, Response } from 'express';
import { AppError } from 'errors';

const errorHandler = (err: AppError, req: Request, res: Response) => {
  console.error(err);

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred',
    });
  }
};

export default errorHandler;
