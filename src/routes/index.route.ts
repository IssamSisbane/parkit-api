import { Router } from 'express';
import IndexController from '~/controllers/index.controller';
import { Route } from '~/types/route.type';

class IndexRoute implements Route {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}status`, this.indexController.index);
    }
}

export default IndexRoute;
