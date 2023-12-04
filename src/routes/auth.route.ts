import { Router } from 'express';
import AuthController from '~/controllers/auth.controller';
import { Route } from '~/types/route.type';
import authMiddleware from '~/middlewares/auth.middleware';

class AuthRoute implements Route {
    public path = '/auth';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, this.authController.register);
        this.router.post(`${this.path}/login`, this.authController.logIn);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logOut);
    }
}

export default AuthRoute;
