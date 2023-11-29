import mongoose from "mongoose";

type TSpot = {
    numero: Number;
    etat: string;
}

const spotSchema = new mongoose.Schema<TSpot>({
    numero: {
        type: Number,
        required: true,
    },
    etat: {
        type: String,
        required: true,
    },
});

const Spot = mongoose.model("Spot", spotSchema, "spots");

export { Spot, TSpot, spotSchema };