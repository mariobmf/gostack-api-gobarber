import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(userId);

    if (!user)
      throw new AppError('Only authenticated user can change avatar', 401);

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const promiseStat = promisify(fs.stat);
      const userAvatarFileExists = await promiseStat(userAvatarFilePath);

      if (userAvatarFileExists) {
        const promiseUnlink = promisify(fs.unlink);
        await promiseUnlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
