import express from "express";
import { get } from "http";
import { createUser, getAllUsers, getUserById, findUser } from "~/services/user.service";

const userRouter = express.Router();

userRouter.get("/getAll", async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
});

userRouter.get("/get", async (req, res) => {
    const user = await getUserById(req.body.id);
    res.json(user);
});

userRouter.post("/find", async (req, res) => {
    const users = await findUser(req.body);
    res.json(users);
});

userRouter.post("/create", async (req, res) => {
    const user = await createUser(req.body);
    res.json(user);
});

export { userRouter };