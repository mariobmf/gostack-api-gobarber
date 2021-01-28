import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const promiseRename = promisify(fs.rename);

    await promiseRename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    fs.access(filePath, async error => {
      if (error) return;

      const promiseUnlink = promisify(fs.unlink);
      await promiseUnlink(filePath);
    });
  }
}
