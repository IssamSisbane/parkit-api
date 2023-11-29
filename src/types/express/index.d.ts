import { TUser } from "~/models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: TUser
        }
    }
}