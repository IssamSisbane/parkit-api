import { Router } from 'express';
import PlacesController from '~/controllers/place.controller';
import { Route } from '~/interfaces/route.interface';
import authMiddleware from '~/middlewares/auth.middleware';

class PlacesRoute implements Route {
    public path = '/places';
    public router = Router();
    public placesController = new PlacesController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.placesController.getPlaces);
        this.router.get(`${this.path}/:id`, authMiddleware, this.placesController.getPlaceByNumero);
        this.router.post(`${this.path}`, authMiddleware, this.placesController.createPlace);
        this.router.put(`${this.path}/:id`, authMiddleware, this.placesController.updatePlace);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.placesController.deletePlace);
    }
}

export default PlacesRoute;