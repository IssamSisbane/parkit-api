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
        if (isEmpty(reservationId)) throw new HttpException(400, "L'id de la reservation est vide.");

        const findReservation: TReservation | null = await this.reservations.findOne({ _id: reservationId });
        if (!findReservation) throw new HttpException(409, "La reservation n'existe pas.");

        return findReservation;
    }

    public async findReservationByUser(username: string): Promise<TReservation> {
        if (isEmpty(username)) throw new HttpException(400, "Le nom d'utilisateur est vide.");

        const findReservation: TReservation | null = await this.reservations.findOne({ user: username });
        if (!findReservation) throw new HttpException(409, "L'utilisateur n'existe pas.");

        return findReservation;
    }

    public async findReservationBySpot(spotId: string): Promise<TReservation> {
        if (isEmpty(spotId)) throw new HttpException(400, "L'id de la place est vide.");

        const findReservation: TReservation | null = await this.reservations.findOne({ spot: spotId });
        if (!findReservation) throw new HttpException(409, "La place n'existe pas.");

        return findReservation;
    }

    public async createReservation(reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "Les données de la réservation sont vides.");

        const findReservation: TReservation | null = await this.reservations.findOne({ ...reservationData });
        if (findReservation) throw new HttpException(409, `La reservation existe déjà.`);


        const createReservationData: TReservation = await this.reservations.create({ ...reservationData });

        return createReservationData;
    }

    public async updateReservation(reservationId: string, reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "Les données de la réservation sont vides.");

        const updateReservationById: TReservation | null = await this.reservations.findByIdAndUpdate(reservationId, { ...reservationData }, { new: true });
        if (!updateReservationById) throw new HttpException(409, "La reservation n'existe pas.");

        return updateReservationById;
    }

    public async deleteReservation(reservationId: string): Promise<TReservation> {
        const deleteReservationById: TReservation | null = await this.reservations.findByIdAndDelete(reservationId);
        if (!deleteReservationById) throw new HttpException(409, "La reservation n'existe pas.");

        return deleteReservationById;
    }
}

export default ReservationService;