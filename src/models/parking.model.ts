import mongoose from "mongoose";

type TParking = {
    _id: mongoose.Types.ObjectId;
    name: string;
    address: string;
    columnNumber: number;
    rowNumber: number;
}

const parkingSchema = new mongoose.Schema<TParking>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },
    columnNumber: {
        type: Number,
        required: true,
    },
    rowNumber: {
        type: Number,
        required: true,
    }
});

const Parking = mongoose.model("Parking", parkingSchema, "parkings");

export { Parking, TParking, parkingSchema };