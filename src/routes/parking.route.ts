import { Router } from "express";
import ParkingsController from "~/controllers/parking.controller";
import authMiddleware from "~/middlewares/auth.middleware";
import { Route } from "~/types/route.type";

class ParkingsRoute implements Route {
    public path = '/parkings';
    public router = Router();
    public parkingsController = new ParkingsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.parkingsController.getParkings);
        this.router.get(`${this.path}/:_id`, authMiddleware, this.parkingsController.getParkingById);
        this.router.post(`${this.path}`, authMiddleware, this.parkingsController.createParking);
        this.router.put(`${this.path}/:_id`, authMiddleware, this.parkingsController.updateParking);
        this.router.delete(`${this.path}/:_id`, authMiddleware, this.parkingsController.deleteParking);
    }
}

export default ParkingsRoute;