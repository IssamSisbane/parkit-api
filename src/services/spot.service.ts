import { HttpException } from '~/exceptions/HttpException';
import { Spot, TSpot } from '~/models/spot.model';
import { isEmpty } from '~/utils/util';

class SpotService {
    public spots = Spot;

    public async findAllSpots(): Promise<TSpot[]> {
        const spots: TSpot[] = await this.spots.find();
        return spots;
    }

    public async findSpotByNumero(numero: Number): Promise<TSpot> {
        if (isEmpty(numero)) throw new HttpException(400, "UserId is empty");

        const findUser: TSpot | null = await this.spots.findOne({ numero: numero });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public async createSpot(spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "userData is empty");

        const foundSpot: TSpot | null = await this.spots.findOne({ numero: spotData.numero });
        if (foundSpot) throw new HttpException(409, `This numero ${spotData.numero} already exists`);

        const createSpotData: TSpot = await this.spots.create({ ...spotData });

        return createSpotData;
    }

    public async updateSpot(numero: Number, spotData: TSpot): Promise<TSpot> {
        if (isEmpty(spotData)) throw new HttpException(400, "spotData is empty");

        if (spotData.numero) {
            const foundSpot: TSpot | null = await this.spots.findOne({ numero: spotData.numero });
            if (foundSpot && foundSpot.numero != numero) throw new HttpException(409, `This numero ${spotData.numero} already exists`);
        }

        const updateSpotByNumero: TSpot | null = await this.spots.findOneAndUpdate({ numero }, { ...spotData }, { new: true });
        if (!updateSpotByNumero) throw new HttpException(409, "User doesn't exist");

        return updateSpotByNumero;
    }

    public async deleteSpot(numero: Number): Promise<TSpot> {
        const deleteSpotById: TSpot | null = await this.spots.findByIdAndDelete(numero);
        if (!deleteSpotById) throw new HttpException(409, "Spot doesn't exist");

        return deleteSpotById;
    }
}

export default SpotService;