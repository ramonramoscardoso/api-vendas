import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UserRepository";
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({userId, avatarFilename}: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if(!user) {
            throw new AppError('User not found');
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;