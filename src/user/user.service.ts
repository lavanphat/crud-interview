import { Injectable } from '@nestjs/common';
import { PrismaService } from '../util/prisma.service';
import { SignUpDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: SignUpDto) {
    const result = await this.prismaService.user.create({ data });
    return this.exclude(result, ['password']);
  }

  async getAll(take: number, skip: number, where) {
    const result = await this.prismaService.user.findMany({
      take,
      skip,
      where,
    });
    return result.map((i) => this.exclude(i, ['password']));
  }

  async getOne(id: string) {
    const result = await this.prismaService.user.findUniqueOrThrow({
      where: { id },
    });
    return this.exclude(result, ['password']);
  }

  update(id: string, data) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  // Exclude keys from user
  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
