import { HttpException } from '~/exceptions/HttpException';
import { IPlace } from '~/models/place.model';
import { Reservation, IReservation } from '~/models/reservation.model';
import { IUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';

class ReservationService {
    public reservations = Reservation;

    public async findAllReservations(): Promise<IReservation[]> {
        const reservations: IReservation[] = await this.reservations.find();
        return reservations;
    }

    public async findReservationById(reservationId: string): Promise<IReservation> {
        if (isEmpty(reservationId)) throw new HttpException(400, "UserId is empty");

        const findReservation: IReservation | null = await this.reservations.findOne({ _id: reservationId });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async findReservationByUser(user: IUser): Promise<IReservation> {
        if (isEmpty(user)) throw new HttpException(400, "UserId is empty");

        const findReservation: IReservation | null = await this.reservations.findOne({ user: user });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async findReservationByPlace(place: IPlace): Promise<IReservation> {
        if (isEmpty(place)) throw new HttpException(400, "UserId is empty");

        const findReservation: IReservation | null = await this.reservations.findOne({ place: place });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async createReservation(reservationData: IReservation): Promise<IReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "reservationData is empty");

        const findReservation: IReservation | null = await this.reservations.findOne({ ...reservationData });
        if (findReservation) throw new HttpException(409, `This reservation already exists`);


        const createReservationData: IReservation = await this.reservations.create({ ...reservationData });

        return createReservationData;
    }

    public async updateReservation(reservationId: string, reservationData: IReservation): Promise<IReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "userData is empty");

        const updateReservationById: IReservation | null = await this.reservations.findByIdAndUpdate(reservationId, { ...reservationData }, { new: true });
        if (!updateReservationById) throw new HttpException(409, "User doesn't exist");

        return updateReservationById;
    }

    public async deleteReservation(reservationId: string): Promise<IReservation> {
        const deleteReservationById: IReservation | null = await this.reservations.findByIdAndDelete(reservationId);
        if (!deleteReservationById) throw new HttpException(409, "User doesn't exist");

        return deleteReservationById;
    }
}

export default ReservationService;