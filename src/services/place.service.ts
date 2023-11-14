import { HttpException } from '~/exceptions/HttpException';
import { Place, IPlace } from '~/models/place.model';
import { isEmpty } from '~/utils/util';

class PlaceService {
    public places = Place;

    public async findAllPlaces(): Promise<IPlace[]> {
        const places: IPlace[] = await this.places.find();
        return places;
    }

    public async findPlaceByNumero(numero: Number): Promise<IPlace> {
        if (isEmpty(numero)) throw new HttpException(400, "UserId is empty");

        const findUser: IPlace | null = await this.places.findOne({ numero: numero });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public async createPlace(placeData: IPlace): Promise<IPlace> {
        if (isEmpty(placeData)) throw new HttpException(400, "userData is empty");

        const foundPlace: IPlace | null = await this.places.findOne({ numero: placeData.numero });
        if (foundPlace) throw new HttpException(409, `This numero ${placeData.numero} already exists`);

        const createPlaceData: IPlace = await this.places.create({ ...placeData });

        return createPlaceData;
    }

    public async updatePlace(numero: Number, placeData: IPlace): Promise<IPlace> {
        if (isEmpty(placeData)) throw new HttpException(400, "placeData is empty");

        if (placeData.numero) {
            const foundPlace: IPlace | null = await this.places.findOne({ numero: placeData.numero });
            if (foundPlace && foundPlace.numero != numero) throw new HttpException(409, `This numero ${placeData.numero} already exists`);
        }

        const updatePlaceByNumero: IPlace | null = await this.places.findOneAndUpdate({ numero }, { ...placeData }, { new: true });
        if (!updatePlaceByNumero) throw new HttpException(409, "User doesn't exist");

        return updatePlaceByNumero;
    }

    public async deletePlace(numero: Number): Promise<IPlace> {
        const deletePlaceById: IPlace | null = await this.places.findByIdAndDelete(numero);
        if (!deletePlaceById) throw new HttpException(409, "Place doesn't exist");

        return deletePlaceById;
    }
}

export default PlaceService;