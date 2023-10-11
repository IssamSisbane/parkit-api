import { IUser } from '~/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from "~/models/user.model";
import { hash } from 'bcrypt';

async function createUser(user: IUser) {
    const newUser = new User(user);
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.password = await hash(user.password, 10);
    await newUser.save();
    return user;
}

// TODO
async function updateUser(user: IUser) {

    return user;
}

async function getAllUsers() {
    const users = await User.find();
    return users;
}

async function getUserById(id: string) {
    const user = await User.findById(id);
    return user;
}

async function findUser(params: any) {
    const user = await User.find(params);
    return user;
}

export { createUser, getAllUsers, getUserById, findUser }