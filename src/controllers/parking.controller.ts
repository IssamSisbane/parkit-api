import { Request, Response, NextFunction } from "express";
import { TParking } from "~/models/parking.model";
import ParkingService from "~/services/parking.service";

class ParkingsController {
    public parkingService = new ParkingService();

    public getParkings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllParkingsData: TParking[] = await this.parkingService.findAllParking();

            res.status(200).json({ data: findAllParkingsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getParkingById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id: string = req.params._id;
            const findOneParkingData: TParking = await this.parkingService.findParkingById(_id);

            res.status(200).json({ data: findOneParkingData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createParking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parkingData: TParking = req.body;
            const createParkingData: TParking = await this.parkingService.createParking(parkingData);

            res.status(201).json({ data: createParkingData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateParking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id: string = req.params._id;
            const parkingData: TParking = req.body;
            const updateParkingData: TParking = await this.parkingService.updateParking(_id, parkingData);

            res.status(200).json({ data: updateParkingData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteParking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id: string = req.params._id;
            const deleteParkingData: TParking = await this.parkingService.deleteParking(_id);

            res.status(200).json({ data: deleteParkingData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default ParkingsController;