import { HttpException } from '~/exceptions/HttpException';
import { Spot, TSpot } from '~/models/spot.model';
import { isEmpty } from '~/utils/util';

class SpotService {
    public spots = Spot;

    public async findAllSpots(): Promise<TSpot[]> {
        const spots: TSpot[] = await this.spots.find();
        return spots;
    }

    public async findSpotById(id: string): Promise<TSpot> {
        if (isEmpty(id)) throw new HttpException(400, "L'id de la place est vide.");

        const foundSpot: TSpot | null = await this.spots.findOne({ id: id });
        if (!foundSpot) throw new HttpException(409, "La place n'existe pas.");

        return foundSpot;
    }

    public async createSpot(spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "Les données de la place sont vides.");

        const foundSpot: TSpot | null = await this.spots.findOne({ id: spotData.id });
        if (foundSpot) throw new HttpException(409, `L'id '${spotData.id}' existe déjà.`);

        const createSpotData: TSpot = await this.spots.create({ ...spotData });

        return createSpotData;
    }

    public async updateSpot(id: string, spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "Les données de la place sont vides.");

        if (spotData.id) {
            const foundSpot: TSpot | null = await this.spots.findOne({ id: spotData.id });
            if (foundSpot && foundSpot.id != id) throw new HttpException(409, `L'id '${spotData.id}' existe déjà.`);
        }

        const updateSpotById: TSpot | null = await this.spots.findOneAndUpdate({ id }, { ...spotData }, { new: true, runValidators: true });
        if (!updateSpotById) throw new HttpException(409, "La place n'existe pas.");

        return updateSpotById;
    }

    public async deleteSpot(id: string): Promise<TSpot> {
        const deleteSpotById: TSpot | null = await this.spots.findOneAndDelete({ id });
        if (!deleteSpotById) throw new HttpException(409, "La place n'existe pas.");

        return deleteSpotById;
    }
}

export default SpotService;