import mongoose from "mongoose";

enum SpotState {
    free = "free",
    occupied = "occupied",
    reserved = "reserved",
}

type TSpot = {
    _id: mongoose.Types.ObjectId;
    name: string;
    state: SpotState;
    column: number;
    row: number;
    parking: mongoose.Types.ObjectId;
}

const spotSchema = new mongoose.Schema<TSpot>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["free", "occupied", "reserved"],
        required: true,
    },
    column: {
        type: Number,
        required: true,
    },
    row: {
        type: Number,
        required: true,
    },
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking',
        required: true,
    },
});

const Spot = mongoose.model("Spot", spotSchema, "spots");

export { Spot, TSpot, spotSchema };