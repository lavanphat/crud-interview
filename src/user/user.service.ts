import { Injectable } from '@nestjs/common';
import { PrismaService } from '../util/prisma.service';
import { SignUpDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: SignUpDto) {
    return this.prismaService.user.create({ data });
  }

  getAll(take: number, skip: number, where) {
    return this.prismaService.user.findMany({ take, skip, where });
  }

  getOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, data) {
    return this.prismaService.user.update({ where: { id }, data });
  }
}
