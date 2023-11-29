import mongoose, { Date } from "mongoose";

type TReservation = {
    user: string;
    spot: string;
    createdAt: Date;
    startedAt: Date;
    endedAt: Date;
}

const reservationSchema = new mongoose.Schema<TReservation>({
    user: {
        type: String,
        required: true,
    },
    spot: {
        type: String,
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