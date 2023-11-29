import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '~/config/env.config';
import { TRegisterUserDto, TLoginUserDto } from '~/types/dtos/user.dto';
import { HttpException } from '~/exceptions/HttpException';
import { TDataStoredInToken, TDataToken } from '~/types/auth.type';
import { User, TUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';

class AuthService {
    public users = User;

    public async signup(userData: TRegisterUserDto): Promise<TLoginUserDto> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: TLoginUserDto | null = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: TLoginUserDto | null = await this.users.create({ ...userData, createdAt: new Date(), updatedAt: new Date, password: hashedPassword });

        return createUserData;
    }

    public async login(userData: TLoginUserDto): Promise<TDataToken> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: TUser | null = await this.users.findOne({ email: userData.email });
        if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

        const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Password is not matching");

        const TDataToken = this.createToken(findUser);

        return TDataToken;
    }

    public async logout(userData: TLoginUserDto): Promise<TLoginUserDto> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: TLoginUserDto | null = await this.users.findOne({ email: userData.email, password: userData.password });
        if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

        return findUser;
    }

    public createToken(user: TUser): TDataToken {
        const TDataStoredInToken: TDataStoredInToken = { _id: user._id };
        const secretKey: string = JWT_SECRET!;
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(TDataStoredInToken, secretKey, { expiresIn }) };
    }

    // to Delete
    public createCookie(TDataToken: TDataToken): string {
        return `Authorization=${TDataToken.token}; HttpOnly; Max-Age=${TDataToken.expiresIn};`;
    }
}

export default AuthService;