import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty({ nullable: true })
  fullname: string;

  @ApiProperty({ nullable: true })
  deleted_at: Date;
}
