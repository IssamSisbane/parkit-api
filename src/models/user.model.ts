import mongoose from "mongoose";

type TUser = {
    _id: string;
    username: string;
    email: string;
    password: string;
    profilePicture: number;
}

const userSchema = new mongoose.Schema<TUser>({
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
});

const User = mongoose.model("User", userSchema, "users");

export { User, TUser, userSchema };