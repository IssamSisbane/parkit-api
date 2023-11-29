import { NextFunction, Request, Response } from 'express';
import { TRegisterUserDto } from '~/types/dtos/user.dto';
import { TLoginUserDto } from '~/types/dtos/user.dto';
import AuthService from '~/services/auth.service';

class AuthController {
    public authService = new AuthService();

    public signUp = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req)
            const userData: TRegisterUserDto = req.body;
            const signUpUserData: TLoginUserDto = await this.authService.signup(userData);

            res.status(201).json({ data: signUpUserData, message: 'signup' });
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            const userData: TRegisterUserDto = req.body;
            console.log(userData)
            const { token } = await this.authService.login(userData);

            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    };

    // to Delete
    public logOut = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                throw new Error('Invalid token');
            }

            if (req.user) {
                const userData: TLoginUserDto = req.user;
                const logOutUserData: TLoginUserDto = await this.authService.logout(userData);

                res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
                res.status(200).json({ data: logOutUserData, message: 'logout' });
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
