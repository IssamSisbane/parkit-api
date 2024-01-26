import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { ACCESS_JWT_SECRET } from '~/config/env.config';
import { HttpException } from '~/exceptions/HttpException';
import { TDataStoredInToken } from '~/types/auth.type';
import { User } from '~/models/user.model';


const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.header('Authorization') ? req.header('Authorization')!.split('Bearer ')[1] : null;

        if (Authorization) {
            const secretKey: any = ACCESS_JWT_SECRET;
            const verificationResponse = (await verify(Authorization, secretKey)) as TDataStoredInToken;
            const userId = verificationResponse._id;
            const foundUser = await User.findById(userId);

            if (foundUser) {
                req.user = foundUser;
                next();
            } else {
                next(new HttpException(401, 'Token d\'authentification invalide.'));
            }
        } else {
            next(new HttpException(404, 'Token d\'authentification manquant.'));
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            next(new HttpException(401, "Le token a expiré."));
        } else {
            next(new HttpException(401, 'Token d\'authentification invalide.'));
        }
    }
};

export default authMiddleware;
