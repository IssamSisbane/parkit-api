import mongoose, { Date } from "mongoose";
import { IUser, User, userSchema } from "./user.model";
import { IPlace, Place, placeSchema } from "./place.model";


interface IReservation {
    _id?: string;
    user: IUser;
    place: IPlace;
    dateReservation: Date;
    dateExpiration: Date;
}

const reservationSchema = new mongoose.Schema<IReservation>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Place",
    },
    dateReservation: {
        type: Date,
        required: true,
    },
    dateExpiration: {
        type: Date,
        required: true,
    },
});

const Reservation = mongoose.model("Reservation", reservationSchema, "reservations");

export { Reservation, IReservation, reservationSchema };