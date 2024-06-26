import mongoose from "mongoose";

type TUser = {
    _id: mongoose.Types.ObjectId;
    username: string;
    email: string;
    password: string;
    profilePicture: number;
    nfcId: string;
}

const userSchema = new mongoose.Schema<TUser>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: Number,
        required: true,
    },
    nfcId: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("User", userSchema, "users");

export { User, TUser, userSchema };