import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '~/config/env.config';
import { RegisterUserDto, LoginUserDto } from '~/dtos/user.dto';
import { HttpException } from '~/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '~/interfaces/auth.interface';
import { IUser } from '~/interfaces/user.interface';
import { User } from '~/models/user.model';
import { isEmpty } from '~/utils/util';

class AuthService {
    public users = User;

    public async signup(userData: RegisterUserDto): Promise<IUser> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: IUser | null = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: IUser | null = await this.users.create({ ...userData, createdAt: new Date(), updatedAt: new Date, password: hashedPassword });

        return createUserData;
    }

    public async login(userData: LoginUserDto): Promise<TokenData> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: IUser | null = await this.users.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

        const tokenData = this.createToken(findUser);

        return tokenData;
    }

    public async logout(userData: IUser): Promise<IUser> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: IUser | null = await this.users.findOne({ email: userData.email, password: userData.password });
        if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

        return findUser;
    }

    public createToken(user: IUser): TokenData {
        const dataStoredInToken: DataStoredInToken = { _id: user._id };
        const secretKey: string = JWT_SECRET!;
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
    }

    // to Delete
    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}

export default AuthService;