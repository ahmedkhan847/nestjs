import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  password: string;
}
