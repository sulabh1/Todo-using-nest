import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';

import { Auth } from './auth.entity';
import { AuthCredentialDto } from './dtos/auth-credential.dto';

@Injectable()
// @EntityRepository(Auth)
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly auth: Repository<Auth>,
  ) {}
  async signUp(authCredentialDto: AuthCredentialDto): Promise<Auth> {
    const { name, email, password, role } = authCredentialDto;
    const existEmail = await this.auth.findOne({ email });

    if (existEmail) {
      throw new BadRequestException('Email already exist');
    } else {
      const user = this.auth.create({ name, email, password, role });

      return await this.auth.save(user);
    }
  }
}
