import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { User } from './user.entity';
import { FileService } from '../file/file.service';
import { ICreateUserPayload } from './user.interface';
import { IFile } from 'src/types/entities/File';
import { CommissionService } from '../commission/commission.service';
import { ApplicantService } from '../applicant/applicant.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly fileService: FileService,
    private readonly commissionService: CommissionService,
    private readonly applicantService: ApplicantService,
    private readonly configService: ConfigService,
  ) {}

  public async getUser(refreshToken: string) {
    const user = await this.userRepository.findOne({
      relations: { token: true },
      where: { token: { refresh_token: refreshToken } },
    });
    user.password = undefined;
    user.token = undefined;
    return user;
  }

  public async getByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async create(payload: ICreateUserPayload) {
    try {
      const commissions = await this.commissionService.getAll();
      let commission = null;

      if (!commissions.length) {
        commission = await this.commissionService.createOne({
          name: 'Комісія №1',
        });
      }

      const userDto = new UserDto({
        ...payload.user,
        commissions: [commission ?? commissions[0]],
      });

      const user = await this.userRepository.save(userDto);
      let newAvatar: IFile | null = null;

      const applicant = await this.applicantService.createOne(user);
      await this.userRepository.update({ id: user.id }, { applicant });

      if (user && payload?.avatar) {
        newAvatar = await this.fileService.createOne({
          file_url: `${this.configService.get('UPLOADED_FILE_PATH')}${
            payload.avatar?.filename || payload.avatar.originalname
          }`,
          name: payload.avatar.originalname,
          file_name: payload.avatar?.filename || payload.avatar.originalname,
          user,
        });

        const updatedUser = await this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({ avatar_url: newAvatar?.file_url })
          .where('id = :id', { id: user.id })
          .returning('*')
          .execute();

        return updatedUser.raw[0];
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateOne(id: number, payload) {
    await this.userRepository.update({ id }, payload);
  }
}
