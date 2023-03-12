import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { File } from './file.entity';
import { ICreateManyFilesPayload } from './file.interface';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  createOne(payload) {
    return this.fileRepository.save(payload);
  }

  async createMany(payload: ICreateManyFilesPayload) {
    try {
      const { userId, decisionId, applicationId, files } = payload;
      const filesArr = [];

      for (const file of files) {
        filesArr.push({
          file_url: `${this.configService.get('UPLOADED_FILE_PATH')}${
            file?.filename || file.originalname
          }`,
          name: file.originalname,
          file_name: file?.filename || file.originalname,
          user: { id: userId },
          decision: decisionId ? { id: decisionId } : null,
          application: applicationId ? { id: applicationId } : null,
        });
      }

      await this.fileRepository.insert(filesArr);
    } catch (error) {
      throw error;
    }
  }
}
