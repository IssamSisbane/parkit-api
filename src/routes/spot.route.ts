import { Router } from 'express';
import SpotsController from '~/controllers/spot.controller';
import { Route } from '~/types/route.type';
import authMiddleware from '~/middlewares/auth.middleware';

class SpotsRoute implements Route {
    public path = '/spots';
    public router = Router();
    public spotsController = new SpotsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.spotsController.getSpots);
        this.router.post(`${this.path}/parking/:parking`, authMiddleware, this.spotsController.getSpotsFromParking);
        this.router.get(`${this.path}/:_id`, authMiddleware, this.spotsController.getSpotBynumber);
        this.router.post(`${this.path}`, authMiddleware, this.spotsController.createSpot);
        this.router.put(`${this.path}/:_id`, authMiddleware, this.spotsController.updateSpot);
        this.router.delete(`${this.path}/:_id`, authMiddleware, this.spotsController.deleteSpot);
    }
}

export default SpotsRoute;