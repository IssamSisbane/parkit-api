import { Router } from 'express';
import UsersController from '~/controllers/user.controller';
import { Route } from '~/interfaces/route.interface';

class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        this.router.post(`${this.path}`, this.usersController.createUser);
        this.router.put(`${this.path}/:id`, this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    }
}

export default UsersRoute;