import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~/exceptions/HttpException';
import { Reservation, TReservation } from '~/models/reservation.model';
import ReservationService from '~/services/reservation.service';
import SpotService from '~/services/spot.service';
import UserService from '~/services/user.service';

class ReservationsController {
    public reservationService = new ReservationService();
    public userService = new UserService();
    public spotService = new SpotService();

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

            res.status(200).json({ data: findOneReservationData, message: 'findOneById' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const findOneReservationData: TReservation = await this.reservationService.findReservationByUser(username);

            res.status(200).json({ data: findOneReservationData, message: 'findByUser' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationBySpot = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const spotId: string = req.params.spotId;
            const findOneReservationData: TReservation = await this.reservationService.findReservationBySpot(spotId);

            res.status(200).json({ data: findOneReservationData, message: 'findBySpot' });
        } catch (error) {
            next(error);
        }
    };

    public createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationData: TReservation = req.body;

            await this.userService.findUserByUsername(reservationData.user);
            await this.spotService.findSpotById(reservationData.spot);

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

            if (reservationData.user) await this.userService.findUserByUsername(reservationData.user);
            if (reservationData.spot) await this.spotService.findSpotById(reservationData.spot);

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