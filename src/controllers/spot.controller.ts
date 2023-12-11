import { NextFunction, Request, Response } from 'express';
import { TSpot } from '~/models/spot.model';
import SpotService from '~/services/spot.service';

class SpotsController {
    public spotService = new SpotService();

    public getSpots = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllSpotsData: TSpot[] = await this.spotService.findAllSpots();

            res.status(200).json({ data: findAllSpotsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getSpotsFromParking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const parking: string = req.params.parking;
            const state: string = req.body.state;
            const findAllSpotsData: TSpot[] = await this.spotService.findAllSpotsFromParking(parking, state);

            res.status(200).json({ data: findAllSpotsData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    }

    public getSpotBynumber = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id: string = req.params._id;
            const findOneSpotData: TSpot = await this.spotService.findSpotById(_id);

            res.status(200).json({ data: findOneSpotData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createSpot = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const spotData: TSpot = req.body;
            const createSpotData: TSpot = await this.spotService.createSpot(spotData);

            res.status(201).json({ data: createSpotData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateSpot = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const spotId: string = req.params._id;
            const spotData: TSpot = req.body;
            const updateSpotData: TSpot = await this.spotService.updateSpot(spotId, spotData);

            res.status(200).json({ data: updateSpotData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteSpot = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const spotId: string = req.params._id;
            const deleteSpotData: TSpot = await this.spotService.deleteSpot(spotId);

            res.status(200).json({ data: deleteSpotData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default SpotsController;