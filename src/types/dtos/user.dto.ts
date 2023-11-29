export type TRegisterUserDto = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TLoginUserDto = {
    email: string;
    password: string;
}

export type TUserDto = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}