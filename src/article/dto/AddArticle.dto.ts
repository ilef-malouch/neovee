import { IsNotEmpty, IsString } from 'class-validator';

export class AddArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
