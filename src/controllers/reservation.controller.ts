import { NextFunction, Request, Response } from 'express';
import { Reservation, TReservation } from '~/models/reservation.model';
import ReservationService from '~/services/reservation.service';

class ReservationsController {
    public reservationService = new ReservationService();

    public getReservations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllReservationsData: TReservation[] = await this.reservationService.findAllReservations();

            res.status(200).json({ data: findAllReservationsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const findOneReservationData: TReservation = await this.reservationService.findReservationById(reservationId);

            res.status(200).json({ data: findOneReservationData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationData: TReservation = req.body;
            const createReservationData: TReservation = await this.reservationService.createReservation(reservationData);

            res.status(201).json({ data: createReservationData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const reservationData: TReservation = req.body;
            const updateReservationData: TReservation = await this.reservationService.updateReservation(reservationId, reservationData);

            res.status(200).json({ data: updateReservationData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const deleteReservationData: TReservation = await this.reservationService.deleteReservation(reservationId);

            res.status(200).json({ data: deleteReservationData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ReservationsController;