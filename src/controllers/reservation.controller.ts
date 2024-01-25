import { NextFunction, Request, Response } from 'express';
import { HttpException } from '~/exceptions/HttpException';
import { Reservation, TReservation } from '~/models/reservation.model';
import { TSpot } from '~/models/spot.model';
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
            const reservationId: string = req.params._id;
            const findOneReservationData: TReservation = await this.reservationService.findReservationById(reservationId);

            res.status(200).json({ data: findOneReservationData, message: 'findOneById' });
        } catch (error) {
            next(error);
        }
    };

    public getLastReservationByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const findReservationData: TReservation = await this.reservationService.findLastReservationByUser(username);

            res.status(200).json({ data: findReservationData, message: 'findLastReservationByUser' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationsByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const findReservationsData: TReservation[] = await this.reservationService.findReservationsByUser(username);

            res.status(200).json({ data: findReservationsData, message: 'findAllReservationByUser' });
        } catch (error) {
            next(error);
        }
    };

    public getReservationsBySpot = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const spotId: string = req.params.spotId;
            const findReservationsData: TReservation[] = await this.reservationService.findReservationsBySpot(spotId);

            res.status(200).json({ data: findReservationsData, message: 'findAllReservationBySpot' });
        } catch (error) {
            next(error);
        }
    };

    public createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationData: TReservation = req.body;

            await this.userService.findUserByUsername(reservationData.user);
            await this.spotService.findSpotById(reservationData.spot.toString());

            const createReservationData: TReservation = await this.reservationService.createReservation(reservationData);


            res.status(201).json({ data: createReservationData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params._id;
            const reservationData: TReservation = req.body;

            if (reservationData.user) await this.userService.findUserByUsername(reservationData.user);
            if (reservationData.spot) await this.spotService.findSpotById(reservationData.spot.toString());

            const updateReservationData: TReservation = await this.reservationService.updateReservation(reservationId, reservationData);

            res.status(200).json({ data: updateReservationData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reservationId: string = req.params._id;
            const deleteReservationData: TReservation = await this.reservationService.deleteReservation(reservationId);

            res.status(200).json({ data: deleteReservationData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ReservationsController;