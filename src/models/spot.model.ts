import mongoose from "mongoose";

enum SpotState {
    free = "free",
    occupied = "occupied",
    reserved = "reserved",
}

type TSpot = {
    id: string;
    state: SpotState;
}

const spotSchema = new mongoose.Schema<TSpot>({
    id: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ["free", "occupied", "reserved"],
        required: true,
    },
});

const Spot = mongoose.model("Spot", spotSchema, "spots");

export { Spot, TSpot, spotSchema };