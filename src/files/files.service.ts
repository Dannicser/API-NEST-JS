import { Injectable } from '@nestjs/common';
import { FileResponseElement } from './dto/file-response-element';
import { path } from 'app-root-path'; // всегда дает правильный корень на разных os

import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra'; // улучшенная версия дефолтного модуля fs

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
  ): Promise<FileResponseElement[]> {
    const dateFolder = format(new Date(), 'yyyy-MM-dd');
    const uploadFolder = `${path}/uploads/${dateFolder}`;

    await ensureDir(uploadFolder); // проверяет есть ли директория

    const res: FileResponseElement[] = [];

    for (const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);

      res.push({
        url: `${dateFolder}/${file.originalname}`,
        name: file.originalname,
      });
    }

    return res;
  }
}
