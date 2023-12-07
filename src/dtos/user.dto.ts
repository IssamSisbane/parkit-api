class TUserDto {
    username: string;
    email: string;
    profilePicture: number;

    constructor(username: string, email: string, profilePicture: number) {
        this.username = username;
        this.email = email;
        this.profilePicture = profilePicture;
    }
}

class TRegisterUserDto {
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class TLoginUserDto {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}

export { TUserDto, TRegisterUserDto, TLoginUserDto };