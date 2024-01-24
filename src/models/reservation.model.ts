import mongoose, { Date } from "mongoose";

type TReservation = {
    _id: mongoose.Types.ObjectId;
    user: string;
    spot: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    startedAt: Date;
    endedAt: Date;
}

const reservationSchema = new mongoose.Schema<TReservation>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    user: {
        type: String,
        required: true,
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Spot',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    startedAt: {
        type: Date,
        required: true,
    },
    endedAt: {
        type: Date,
        required: true,
    },
});

const Reservation = mongoose.model("Reservation", reservationSchema, "reservations");

export { Reservation, TReservation, reservationSchema };