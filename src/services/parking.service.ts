import { HttpException } from "~/exceptions/HttpException";
import { Parking, TParking } from "~/models/parking.model";
import { isEmpty } from "~/utils/util";
import { Types } from "mongoose";

class ParkingService {
    public parkings = Parking;

    public async findAllParking(): Promise<TParking[]> {
        const parkings: TParking[] = await this.parkings.find();
        return parkings;
    }

    public async findParkingById(_id: string): Promise<TParking> {
        if (_id == undefined || _id == '') throw new HttpException(400, "L'id du parking est vide.");

        const foundParking: TParking | null = await this.parkings.findById(_id);
        if (!foundParking) throw new HttpException(409, "Le parking n'existe pas.");

        return foundParking;
    }

    public async createParking(parkingData: TParking): Promise<TParking> {
        if (isEmpty(parkingData)) throw new HttpException(400, "Les données du parking sont vides.");

        const foundParking: TParking | null = await this.parkings.findOne({ name: parkingData.name });
        if (foundParking) throw new HttpException(409, `Le parking '${parkingData.name}' existe déjà.`);

        parkingData._id = new Types.ObjectId();

        const createParkingData: TParking = await this.parkings.create({ ...parkingData });

        return createParkingData;
    }

    public async updateParking(_id: string, parkingData: TParking): Promise<TParking> {
        if (isEmpty(parkingData)) throw new HttpException(400, "Les données du parking sont vides.");

        if (parkingData.name) {
            const foundParking: TParking | null = await this.parkings.findOne({ name: parkingData.name });
            if (foundParking && foundParking._id.toString() != _id && foundParking.name != parkingData.name) throw new HttpException(409, `Le parking '${parkingData.name}' existe déjà.`);
        }

        const updateParkingById: TParking | null = await this.parkings.findOneAndUpdate({ _id }, parkingData, { new: true });
        if (!updateParkingById) throw new HttpException(409, "Le parking n'existe pas.");

        return updateParkingById;
    }

    public async deleteParking(_id: string): Promise<TParking> {
        const deleteParkingById: TParking | null = await this.parkings.findByIdAndDelete(_id);
        if (!deleteParkingById) throw new HttpException(409, "Le parking n'existe pas.");

        return deleteParkingById;
    }
}

export default ParkingService;