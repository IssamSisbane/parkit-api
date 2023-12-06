import { NextFunction, Request, Response } from 'express';
import { TRegisterUserDto } from '~/types/dtos/user.dto';
import { TLoginUserDto } from '~/types/dtos/user.dto';
import AuthService from '~/services/auth.service';

class AuthController {
    public authService = new AuthService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req)
            const userData: TRegisterUserDto = req.body;
            const registerUserData: TLoginUserDto = await this.authService.register(userData);

            res.status(201).json({ data: registerUserData, message: 'register' });
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
}

export default AuthController;
