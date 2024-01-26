import { Router } from 'express';
import StatsController from '~/controllers/stats.controller';
import { Route } from '~/types/route.type';
import authMiddleware from '~/middlewares/auth.middleware';

class StatsRoute implements Route {
    public path = '/stats';
    public router = Router();
    public statsController = new StatsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/parkings`, authMiddleware, this.statsController.getAllStats);
        this.router.get(`${this.path}/parking/:parkingId`, authMiddleware, this.statsController.getAllStats);
        this.router.get(`${this.path}/parking/:parkingId/last`, authMiddleware, this.statsController.getLastStatsByParking);
        this.router.post(`${this.path}/parking/:parkingId`, authMiddleware, this.statsController.getStatsBetweenDates);
        this.router.post(`${this.path}`, authMiddleware, this.statsController.createStats);
    }
}

export default StatsRoute;