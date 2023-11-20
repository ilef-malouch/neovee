import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SubscribeUserDto } from './dto/SubscribeUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/LoginCredentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(userData: SubscribeUserDto): Promise<Partial<User>> {
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Le username doit etre unique`);
    }
    return { id: user.id, username: user.username, password: user.password };
  }

  async login(credentials: LoginCredentialsDto) {
    const { username, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username,
      })
      .getOne();

    if (!user) {
      throw new NotFoundException(`***Coordonnées incorrectes`);
    }
    const hashedPassword = await bcrypt.hash(password, user.salt);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      const payload = { username };
      const jwt = await this.jwtService.sign(payload);
      return { access_token: jwt };
    } else {
      throw new NotFoundException(`Coordonnées incorrectes`);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
