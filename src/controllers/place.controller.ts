import { NextFunction, Request, Response } from 'express';
import { IPlace } from '~/models/place.model';
import PlaceService from '~/services/place.service';

class PlacesController {
    public placeService = new PlaceService();

    public getPlaces = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllPlacesData: IPlace[] = await this.placeService.findAllPlaces();

            res.status(200).json({ data: findAllPlacesData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getPlaceByNumero = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const numero: Number = parseInt(req.params.id);
            const findOnePlaceData: IPlace = await this.placeService.findPlaceByNumero(numero);

            res.status(200).json({ data: findOnePlaceData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createPlace = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const placeData: IPlace = req.body;
            const createPlaceData: IPlace = await this.placeService.createPlace(placeData);

            res.status(201).json({ data: createPlaceData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updatePlace = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const placeId: Number = parseInt(req.params.id);
            const placeData: IPlace = req.body;
            const updatePlaceData: IPlace = await this.placeService.updatePlace(placeId, placeData);

            res.status(200).json({ data: updatePlaceData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deletePlace = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const placeId: Number = parseInt(req.params.id);
            const deletePlaceData: IPlace = await this.placeService.deletePlace(placeId);

            res.status(200).json({ data: deletePlaceData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default PlacesController;