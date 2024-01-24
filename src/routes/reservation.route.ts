import { Router } from 'express';
import ReservationController from '~/controllers/reservation.controller';
import { Route } from '~/types/route.type';
import authMiddleware from '~/middlewares/auth.middleware';

class ReservationsRoute implements Route {
    public path = '/reservations';
    public router = Router();
    public reservationsController = new ReservationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.reservationsController.getReservations);
        this.router.get(`${this.path}/:_id`, authMiddleware, this.reservationsController.getReservationById);
        this.router.get(`${this.path}/getByUser/:username`, authMiddleware, this.reservationsController.getReservationsByUser);
        this.router.get(`${this.path}/getLastByUser/:username`, authMiddleware, this.reservationsController.getLastReservationByUser);
        this.router.get(`${this.path}/getBySpot/:spotId`, authMiddleware, this.reservationsController.getReservationsBySpot);
        this.router.post(`${this.path}`, authMiddleware, this.reservationsController.createReservation);
        this.router.put(`${this.path}/:_id`, authMiddleware, this.reservationsController.updateReservation);
        this.router.delete(`${this.path}/:_id`, authMiddleware, this.reservationsController.deleteReservation);
    }
}

export default ReservationsRoute;