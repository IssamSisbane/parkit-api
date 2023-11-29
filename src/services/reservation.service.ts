import { HttpException } from '~/exceptions/HttpException';
import { TSpot } from '~/models/spot.model';
import { Reservation, TReservation } from '~/models/reservation.model';
import { TUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';

class ReservationService {
    public reservations = Reservation;

    public async findAllReservations(): Promise<TReservation[]> {
        const reservations: TReservation[] = await this.reservations.find();
        return reservations;
    }

    public async findReservationById(reservationId: string): Promise<TReservation> {
        if (isEmpty(reservationId)) throw new HttpException(400, "UserId is empty");

        const findReservation: TReservation | null = await this.reservations.findOne({ _id: reservationId });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async findReservationByUser(user: TUser): Promise<TReservation> {
        if (isEmpty(user)) throw new HttpException(400, "UserId is empty");

        const findReservation: TReservation | null = await this.reservations.findOne({ user: user });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async findReservationBySpot(spot: TSpot): Promise<TReservation> {
        if (isEmpty(spot)) throw new HttpException(400, "UserId is empty");

        const findReservation: TReservation | null = await this.reservations.findOne({ spot: spot });
        if (!findReservation) throw new HttpException(409, "User doesn't exist");

        return findReservation;
    }

    public async createReservation(reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "reservationData is empty");

        const findReservation: TReservation | null = await this.reservations.findOne({ ...reservationData });
        if (findReservation) throw new HttpException(409, `This reservation already exists`);


        const createReservationData: TReservation = await this.reservations.create({ ...reservationData });

        return createReservationData;
    }

    public async updateReservation(reservationId: string, reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "userData is empty");

        const updateReservationById: TReservation | null = await this.reservations.findByIdAndUpdate(reservationId, { ...reservationData }, { new: true });
        if (!updateReservationById) throw new HttpException(409, "User doesn't exist");

        return updateReservationById;
    }

    public async deleteReservation(reservationId: string): Promise<TReservation> {
        const deleteReservationById: TReservation | null = await this.reservations.findByIdAndDelete(reservationId);
        if (!deleteReservationById) throw new HttpException(409, "User doesn't exist");

        return deleteReservationById;
    }
}

export default ReservationService;