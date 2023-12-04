import mongoose from "mongoose";

type TUser = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema<TUser>({
    username: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
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
    }
});

const User = mongoose.model("User", userSchema, "users");

export { User, TUser, userSchema };