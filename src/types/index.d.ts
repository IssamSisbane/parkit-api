import { IUser } from "~/interfaces/user.interface";
// import { Request } from "express"

export { };

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}