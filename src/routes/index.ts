import express from "express";
import { userRouter } from "./user.route";

const router = express.Router();

router.use("/user", userRouter);

router.get("/status", (request, response) => {
    const status = {
        Status: "Running",
    };
    response.send(status);
});

export { router }