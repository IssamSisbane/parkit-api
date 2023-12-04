export type TRegisterUserDto = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export type TLoginUserDto = {
    email: string;
    password: string;
}

export type TUserDto = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}