import mongoose from "mongoose";

interface IPlace {
    _id?: string;
    numero: Number;
    etat: string;
}

const placeSchema = new mongoose.Schema<IPlace>({
    numero: {
        type: Number,
        required: true,
    },
    etat: {
        type: String,
        required: true,
    },
});

const Place = mongoose.model("Place", placeSchema, "places");

export { Place, IPlace, placeSchema };