import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~/exceptions/HttpException';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        if (error instanceof HttpException) {
            const status: number = error.status || 500;
            const message: string = error.message || 'Something went wrong';

            console.log(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
            res.status(status).json({ message });
        } else {
            console.error(error); // Log the full error for debugging purposes
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error in errorMiddleware:', error); // Log any errors in the error handling itself
        res.status(500).json({ message: 'Internal Server Error' });

    }
};

export default errorMiddleware;