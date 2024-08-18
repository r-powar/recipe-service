// eslint-disable-next-line max-classes-per-file
class AppError extends Error {
        statusCode: number;

        isOperational: boolean;

        constructor(message: string, statusCode: number) {
          super(message);
          this.statusCode = statusCode;
          this.isOperational = true;
          Error.captureStackTrace(this, this.constructor);
        }
}

class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500);
  }
}

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export {
  AppError, NotFoundError, DatabaseError, ValidationError,
};
