import { HttpException } from '~/exceptions/HttpException';
import { Spot, TSpot } from '~/models/spot.model';
import { Reservation, TReservation } from '~/models/reservation.model';
import { User, TUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';
import { Types } from 'mongoose';
import MQTTHandler from '~/handlers/mqtt.handler';


class ReservationService {
    public reservations = Reservation;
    public users = User;
    public spots = Spot;
    public mqttHandler: MQTTHandler;

    public constructor() {
        this.mqttHandler = new MQTTHandler();
    }


    public async findAllReservations(): Promise<TReservation[]> {
        const reservations: TReservation[] = await this.reservations.find();
        return reservations;
    }

    public async findReservationById(reservationId: string): Promise<TReservation> {
        if (isEmpty(reservationId)) throw new HttpException(400, "L'id de la reservation est vide.");

        const foundReservation: TReservation | null = await this.reservations.findOne({ _id: reservationId });
        if (!foundReservation) throw new HttpException(409, "La reservation n'existe pas.");

        return foundReservation;
    }

    public async findLastReservationByUser(username: string): Promise<TReservation> {
        if (isEmpty(username)) throw new HttpException(400, "Le nom d'utilisateur est vide.");

        const foundReservation: TReservation | null = await this.reservations.findOne({ user: username }).sort({ startedAt: -1 }).populate('spot');
        if (!foundReservation) throw new HttpException(409, "Il n'y a aucune reservation pour cette utilisateur.");

        return foundReservation;
    }

    public async findReservationsByUser(username: string): Promise<TReservation[]> {
        if (isEmpty(username)) throw new HttpException(400, "Le nom d'utilisateur est vide.");

        const foundReservations: TReservation[] | null = await this.reservations.find({ user: username }).populate('spot');
        if (!foundReservations) throw new HttpException(409, "Il n'y a aucune reservation pour cette utilisateur.");

        return foundReservations;
    }

    public async findReservationsBySpot(spotId: string): Promise<TReservation[]> {
        if (isEmpty(spotId)) throw new HttpException(400, "L'id de la place est vide.");

        const foundReservations: TReservation[] | null = await this.reservations.find({ spot: spotId });
        if (!foundReservations) throw new HttpException(409, "La place n'existe pas.");

        return foundReservations;
    }

    public async createReservation(reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "Les données de la réservation sont vides.");

        const foundReservation: TReservation | null = await this.reservations.findOne({ ...reservationData });
        if (foundReservation) throw new HttpException(409, `La reservation existe déjà.`);

        const user: TUser | null = await this.users.findOne({ username: reservationData.user });
        if (!user) throw new HttpException(409, "L'utilisateur n'existe pas.");

        const spot: TSpot | null = await this.spots.findOne({ _id: reservationData.spot });
        if (!spot) throw new HttpException(409, "La place n'existe pas.");

        reservationData._id = new Types.ObjectId();
        const createReservationData: TReservation = await this.reservations.create({ ...reservationData });
        await this.spots.findByIdAndUpdate(reservationData.spot, { state: 'reserved' }, { new: true });

        this.mqttHandler.publish('parking/' + spot.parking + '/spot/' + spot._id + '/reserved/start', JSON.stringify({ spot: spot.name, state: 'reserved', endedAt: createReservationData.endedAt }));

        return createReservationData;
    }

    public async updateReservation(reservationId: string, reservationData: TReservation): Promise<TReservation> {
        if (isEmpty(reservationData)) throw new HttpException(400, "Les données de la réservation sont vides.");

        const user: TUser | null = await this.users.findOne({ username: reservationData.user });
        if (!user) throw new HttpException(409, "L'utilisateur n'existe pas.");

        const spot: TSpot | null = await this.spots.findOne({ name: reservationData.spot });
        if (!spot) throw new HttpException(409, "La place n'existe pas.");

        const updateReservationById: TReservation | null = await this.reservations.findByIdAndUpdate(reservationId, { ...reservationData }, { new: true });
        if (!updateReservationById) throw new HttpException(409, "La reservation n'existe pas.");

        return updateReservationById;
    }

    public async deleteReservation(reservationId: string): Promise<TReservation> {
        const deleteReservationById: TReservation | null = await this.reservations.findByIdAndDelete(reservationId);
        if (!deleteReservationById) throw new HttpException(409, "La reservation n'existe pas.");

        await this.spots.findByIdAndUpdate(deleteReservationById.spot, { state: 'free' }, { new: true });

        const spot: TSpot | null = await this.spots.findById(deleteReservationById.spot);

        this.mqttHandler.publish('parking/' + spot!.parking + '/spot/' + spot!._id + '/reserved/end', JSON.stringify({ spot: spot!.name, state: 'reserved' }));

        return deleteReservationById;
    }
}

export default ReservationService;