import { Router } from 'express';
import UsersController from '~/controllers/user.controller';
import { Route } from '~/types/route.type';
import authMiddleware from '~/middlewares/auth.middleware';

class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
        this.router.get(`${this.path}/:username`, authMiddleware, this.usersController.getUserByUsername);
        this.router.post(`${this.path}`, authMiddleware, this.usersController.createUser);
        this.router.put(`${this.path}/:username`, authMiddleware, this.usersController.updateUser);
        this.router.delete(`${this.path}/:username`, authMiddleware, this.usersController.deleteUser);
    }
}

export default UsersRoute;