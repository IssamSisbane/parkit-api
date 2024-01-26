import { HttpException } from '~/exceptions/HttpException';
import { Parking, TParking } from '~/models/parking.model';
import { Spot, TSpot } from '~/models/spot.model';
import { isEmpty } from '~/utils/util';
import { Types } from 'mongoose';

class SpotService {
    public spots = Spot;
    public parkings = Parking;

    public async findAllSpots(): Promise<TSpot[]> {
        const spots: TSpot[] = await this.spots.find().populate('parking');
        return spots;
    }

    public async findAllSpotsFromParking(parking: string, state: string): Promise<TSpot[]> {
        const request = state ? { parking: parking, state: state } : { parking: parking };
        const spots: TSpot[] = await this.spots.find(request).populate('parking');
        return spots;
    }

    public async findSpotById(_id: string): Promise<TSpot> {
        if (isEmpty(_id)) throw new HttpException(400, "L'id de la place est vide.");

        const foundSpot: TSpot | null = await this.spots.findOne({ _id });
        if (!foundSpot) throw new HttpException(409, "La place n'existe pas.");

        return foundSpot;
    }

    public async createSpot(spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "Les données de la place sont vides.");

        const foundSpot: TSpot | null = await this.spots.findOne({ name: spotData.name, parking: spotData.parking });
        if (foundSpot) throw new HttpException(409, `La place avec le nom '${spotData.name}' existe déjà pour ce parking.`);

        const parking: TParking | null = await this.parkings.findOne({ _id: spotData.parking });
        if (!parking) throw new HttpException(409, "Le parking n'existe pas.");

        spotData._id = new Types.ObjectId();

        const createSpotData: TSpot = await this.spots.create({ ...spotData });

        return createSpotData;
    }

    public async updateSpot(_id: string, spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "Les données de la place sont vides.");

        if (spotData.name) {
            const foundSpot: TSpot | null = await this.spots.findOne({ name: spotData.name });
            if (foundSpot && foundSpot._id.toString() != _id && foundSpot.name != spotData.name) throw new HttpException(409, `La place avec le nom '${spotData.name}' existe déjà.`);
        }

        if (spotData.parking) {
            const parking: TParking | null = await this.parkings.findOne({ _id: spotData.parking });
            if (!parking) throw new HttpException(409, "Le parking n'existe pas.");
        }

        const updateSpotById: TSpot | null = await this.spots.findOneAndUpdate({ _id }, { ...spotData }, { new: true, runValidators: true }).populate('parking');
        if (!updateSpotById) throw new HttpException(409, "La place n'existe pas.");

        return updateSpotById;
    }

    public async deleteSpot(_id: string): Promise<TSpot> {
        const deleteSpotById: TSpot | null = await this.spots.findOneAndDelete({ _id });
        if (!deleteSpotById) throw new HttpException(409, "La place n'existe pas.");

        return deleteSpotById;
    }
}

export default SpotService;