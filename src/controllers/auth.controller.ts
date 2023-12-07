import { NextFunction, Request, Response } from 'express';
import { TRegisterUserDto, TUserDto } from '~/dtos/user.dto';
import { TLoginUserDto } from '~/dtos/user.dto';
import AuthService from '~/services/auth.service';
import UserService from '~/services/user.service';

class AuthController {
    public authService = new AuthService();
    public usersService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: TRegisterUserDto = req.body;
            const { accessToken, refreshToken } = await this.authService.register(userData);

            res.cookie('jwt', refreshToken, { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(201).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };

    public logIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: TRegisterUserDto = req.body;
            const { accessToken, refreshToken } = await this.authService.login(userData);

            res.cookie('jwt', refreshToken, { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };

    public getUserInfos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.user!._id;
            const findOneUserData: TUserDto = await this.usersService.findUserById(id);

            res.status(200).json({ data: findOneUserData, message: 'me' });
        } catch (error) {
            next(error);
        }
    };

    public refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const oldRefreshToken: string = req.cookies.jwt;
            const { accessToken, refreshToken: refreshToken } = await this.authService.refresh(oldRefreshToken);

            res.cookie('jwt', refreshToken, { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.status(200).json({ accessToken });
        } catch (error) {
            next(error);
        }
    };


}

export default AuthController;
