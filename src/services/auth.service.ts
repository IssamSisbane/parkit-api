import { hash, compare } from 'bcrypt';
import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { ACCESS_JWT_SECRET, REFRESH_JWT_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } from '~/config/env.config';
import { TRegisterUserDto, TLoginUserDto, TUserDto } from '~/dtos/user.dto';
import { HttpException } from '~/exceptions/HttpException';
import { TDataStoredInToken, TDataToken } from '~/types/auth.type';
import { User, TUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';
import { Types } from 'mongoose';

class AuthService {
    public users = User;

    public async register(userData: TRegisterUserDto): Promise<TDataToken> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur fournies sont vides.");

        const foundUserEmail: TLoginUserDto | null = await this.users.findOne({ email: userData.email });
        if (foundUserEmail) throw new HttpException(409, `L'email '${userData.email}' est déjà utilisé.`);

        const foundUserUsername: TLoginUserDto | null = await this.users.findOne({ username: userData.username });
        if (foundUserUsername) throw new HttpException(409, `Le pseudo '${userData.username}' est déjà utilisé.`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: TUser | null = await this.users.create({ _id: new Types.ObjectId(), ...userData, password: hashedPassword, profilePicture: 0 });

        const accessToken = this.createToken(createUserData, ACCESS_EXPIRES_IN!, ACCESS_JWT_SECRET!);
        const refreshToken = this.createToken(createUserData, REFRESH_EXPIRES_IN!, REFRESH_JWT_SECRET!);

        return { accessToken, refreshToken };
    }

    public async login(userData: TLoginUserDto): Promise<TDataToken> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur fournies sont vides.");

        const foundUser: TUser | null = await this.users.findOne({ username: userData.username });
        if (!foundUser) throw new HttpException(409, `Le pseudo '${userData.username}' n'existe pas`);

        const isPasswordMatching: boolean = await compare(userData.password, foundUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Le mot de passe est incorrect.");

        const accessToken = this.createToken(foundUser, ACCESS_EXPIRES_IN!, ACCESS_JWT_SECRET!);
        const refreshToken = this.createToken(foundUser, REFRESH_EXPIRES_IN!, REFRESH_JWT_SECRET!);

        return { accessToken, refreshToken };
    }

    public async refresh(oldRefreshToken: string): Promise<TDataToken> {
        if (isEmpty(oldRefreshToken)) throw new HttpException(400, "Le token est vide.");

        try {
            const decodedToken = (verify(oldRefreshToken, REFRESH_JWT_SECRET!)) as TDataStoredInToken;
            const userId = decodedToken._id;

            const foundUser: TUser | null = await this.users.findById(userId);
            if (!foundUser) throw new HttpException(409, "L'utilisateur n'existe pas.");


            const accessToken = this.createToken(foundUser, ACCESS_EXPIRES_IN!, ACCESS_JWT_SECRET!);
            const refreshToken = this.createToken(foundUser, REFRESH_EXPIRES_IN!, REFRESH_JWT_SECRET!);

            return { accessToken, refreshToken };

        } catch (err) {
            if (err instanceof TokenExpiredError) {
                throw new HttpException(401, "Le token a expiré.");
            } else {
                throw new HttpException(401, "Erreur de vérification du token.");
            }
        }

    }

    public createToken(user: TUser, expiresIn: string, secretKey: string): string {
        const TDataStoredInToken: TDataStoredInToken = { _id: user._id.toString(), username: user.username };
        return sign(TDataStoredInToken, secretKey, { expiresIn });
    }
}

export default AuthService;