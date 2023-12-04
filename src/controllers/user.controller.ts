import { NextFunction, Request, Response } from 'express';
import { TRegisterUserDto, TLoginUserDto, TUserDto } from '~/types/dtos/user.dto';
import userService from '~/services/user.service';

class UsersController {
    public userService = new userService();

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: TUserDto[] = await this.userService.findAllUser();

            res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        } catch (error) {
            next(error);
        }
    };

    public getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const findOneUserData: TUserDto = await this.userService.findUserByUsername(username);

            res.status(200).json({ data: findOneUserData, message: 'findOne' });
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: TRegisterUserDto = req.body;
            const createUserData: TLoginUserDto = await this.userService.createUser(userData);

            res.status(201).json({ data: createUserData, message: 'created' });
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const userData: TRegisterUserDto = req.body;
            const updateUserData: TLoginUserDto = await this.userService.updateUser(username, userData);

            res.status(200).json({ data: updateUserData, message: 'updated' });
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const deleteUserData: TUserDto = await this.userService.deleteUser(username);

            res.status(200).json({ data: deleteUserData, message: 'deleted' });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;