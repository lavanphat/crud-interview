import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { GetUsersDto, SignUpDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  async signup(@Body() data: SignUpDto) {
    return this.userService.create(data);
  }

  @Get('')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers(@Query() query: GetUsersDto) {
    const filter = query.isDeleted
      ? { NOT: { deleted_at: null } }
      : { deleted_at: null };

    return this.userService.getAll(query.take, query.skip, { ...filter });
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async getUser(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Patch(':id')
  @HttpCode(204)
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    await this.userService.getOne(id);
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    await this.userService.getOne(id);
    return this.userService.update(id, { deleted_at: new Date() });
  }
}
