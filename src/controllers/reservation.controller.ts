import { NextFunction, Request, Response } from 'express';
import { Reservation, IReservation } from '~/models/reservation.model';
import ReservationService from '~/services/reservation.service';

class ReservationsController {
    public reservationService = new ReservationService();

    public getReservations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllReservationsData: IReservation[] = await this.reservationService.findAllReservations();

            res.status(200).json({ data: findAllReservationsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const findOneReservationData: IReservation = await this.reservationService.findReservationById(reservationId);

            res.status(200).json({ data: findOneReservationData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationData: IReservation = req.body;
            const createReservationData: IReservation = await this.reservationService.createReservation(reservationData);

            res.status(201).json({ data: createReservationData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const reservationData: IReservation = req.body;
            const updateReservationData: IReservation = await this.reservationService.updateReservation(reservationId, reservationData);

            res.status(200).json({ data: updateReservationData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params.id;
            const deleteReservationData: IReservation = await this.reservationService.deleteReservation(reservationId);

            res.status(200).json({ data: deleteReservationData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ReservationsController;