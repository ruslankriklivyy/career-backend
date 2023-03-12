import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MulterService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: this.configService.get('DESTINATION_FILE_PATH'),
        filename(_, file, cb) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_, file, cb) => {
        const availableFileTypes = String(
          this.configService.get('AVAILABLE_FILE_TYPES'),
        ).split(',');
        const isValidFile = availableFileTypes.includes(file.mimetype);

        console.log('IS_VALID_FILE', isValidFile);

        if (!isValidFile) {
          return cb(new BadRequestException('Provide a valid image'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: Math.pow(+this.configService.get('MAX_FILE_SIZE'), 2),
      },
    };
  }
}
