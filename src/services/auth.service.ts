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

    public async register(userData: TRegisterUserDto): Promise<TLoginUserDto> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur fournies sont vides.");

        const foundUserEmail: TLoginUserDto | null = await this.users.findOne({ email: userData.email });
        if (foundUserEmail) throw new HttpException(409, `L'email '${userData.email}' est déjà utilisé.`);

        const foundUserUsername: TLoginUserDto | null = await this.users.findOne({ username: userData.username });
        if (foundUserUsername) throw new HttpException(409, `Le pseudo '${userData.username}' est déjà utilisé.`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: TLoginUserDto | null = await this.users.create({ ...userData, password: hashedPassword });

        return createUserData;
    }

    public async login(userData: TLoginUserDto): Promise<TDataToken> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur fournies sont vides.");

        const foundUser: TUser | null = await this.users.findOne({ username: userData.username });
        if (!foundUser) throw new HttpException(409, `Le pseudo '${userData.username}' n'existe pas`);

        const isPasswordMatching: boolean = await compare(userData.password, foundUser.password);
        if (!isPasswordMatching) throw new HttpException(409, "Le mot de passe est incorrect.");

        const TDataToken = this.createToken(foundUser);

        return TDataToken;
    }

    public createToken(user: TUser): TDataToken {
        const TDataStoredInToken: TDataStoredInToken = { _id: user._id };
        const secretKey: string = JWT_SECRET!;
        const expiresIn: number = 60 * 60;

        return { expiresIn, token: sign(TDataStoredInToken, secretKey, { expiresIn }) };
    }
}

export default AuthService;