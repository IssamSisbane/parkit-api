import { Router } from 'express';
import ReservationController from '~/controllers/reservation.controller';
import { Route } from '~/interfaces/route.interface';
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
        this.router.get(`${this.path}/:id`, authMiddleware, this.reservationsController.getReservationById);
        this.router.post(`${this.path}`, authMiddleware, this.reservationsController.createReservation);
        this.router.put(`${this.path}/:id`, authMiddleware, this.reservationsController.updateReservation);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.reservationsController.deleteReservation);
    }
}

export default ReservationsRoute;