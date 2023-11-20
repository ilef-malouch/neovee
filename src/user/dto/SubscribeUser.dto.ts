import { IsNotEmpty, IsString } from 'class-validator';

export class SubscribeUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
