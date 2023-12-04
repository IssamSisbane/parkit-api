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
        if (isEmpty(username)) throw new HttpException(400, "UserId is empty");

        const findUser: TUserDto | null = await this.users.findOne({ username: username });
        if (!findUser) throw new HttpException(409, "User doesn't exist");

        return findUser;
    }

    public async createUser(userData: TRegisterUserDto): Promise<TUser> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        const findUser: TUser | null = await this.users.findOne({ email: userData.email });
        if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

        const hashedPassword = await hash(userData.password, 10);
        const createUserData: TUser = await this.users.create({ ...userData, createdAt: new Date(), updatedAt: new Date(), password: hashedPassword });

        return createUserData;
    }

    public async updateUser(username: string, userData: TRegisterUserDto): Promise<TUser> {
        if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

        if (userData.email) {
            const findUser: TUser | null = await this.users.findOne({ email: userData.email });
            if (findUser && findUser.username != username) throw new HttpException(409, `This email ${userData.email} already exists`);
        }

        if (userData.password) {
            const hashedPassword = await hash(userData.password, 10);
            userData = { ...userData, password: hashedPassword };
        }

        const updateUserById: TUser | null = await this.users.findOneAndUpdate({ username }, userData, { new: true });
        if (!updateUserById) throw new HttpException(409, "User doesn't exist");

        return updateUserById;
    }

    public async deleteUser(username: string): Promise<TUser> {
        const deleteUserById: TUser | null = await this.users.findOneAndDelete({ username });
        if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

        return deleteUserById;
    }
}

export default UserService;