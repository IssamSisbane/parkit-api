import { hash } from 'bcrypt';
import { TRegisterUserDto, TUserDto } from '~/types/dtos/user.dto';
import { HttpException } from '~/exceptions/HttpException';
import { User, TUser } from '~/models/user.model';
import { isEmpty } from '~/utils/util';

class UserService {
    public users = User;

    public async findAllUser(): Promise<TUser[]> {
        const users: TUser[] = await this.users.find();
        return users;
    }

    public async findUserByUsername(username: string): Promise<TUserDto> {
        if (isEmpty(username)) throw new HttpException(400, "Le nom de l'utilisateur est vide.");

        const findUser: TUserDto | null = await this.users.findOne({ username: username });
        if (!findUser) throw new HttpException(409, "L'utilisateur n'existe pas.");

        return findUser;
    }

    public async createUser(userData: TRegisterUserDto): Promise<TUser> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur sont vides.");

        const findUser: TUser | null = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `L'email '${userData.email}' n'existe pas.`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: TUser = await this.users.create({ ...userData, createdAt: new Date(), updatedAt: new Date(), password: hashedPassword });

        return createUserData;
    }

    public async updateUser(username: string, userData: TRegisterUserDto): Promise<TUser> {
        if (isEmpty(userData)) throw new HttpException(400, "Les données de l'utilisateur sont vides.");

        if (userData.email) {
            const findUser: TUser | null = await this.users.findOne({ email: userData.email });
            if (findUser && findUser.username != username) throw new HttpException(409, `L'email '${userData.email}' n'existe pas.`);
        }

        if (userData.password) {
            const hashedPassword = await hash(userData.password, 10);
            userData = { ...userData, password: hashedPassword };
        }

        // To avoid username update
        userData.username = username;

        const updateUserById: TUser | null = await this.users.findOneAndUpdate({ username }, userData, { new: true });
        if (!updateUserById) throw new HttpException(409, "L'utilisateur n'existe pas.");

        return updateUserById;
    }

    public async deleteUser(username: string): Promise<TUser> {
        const deleteUserById: TUser | null = await this.users.findOneAndDelete({ username });
        if (!deleteUserById) throw new HttpException(409, "L'utilisateur n'existe pas.");

        return deleteUserById;
    }
}

export default UserService;