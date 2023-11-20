import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entities/article.entity';
import { AddArticleDto } from './dto/AddArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';
import { JwtAuthGuard } from 'src/user/gards/jwt.auth.gard';
import { User } from 'src/decorators/user.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles(): Promise<Article[]> {
    return await this.articleService.getAllArticles();
  }

  @Get('/restore/:id')
  @UseGuards(JwtAuthGuard)
  async restoreArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.restoreArticle(id);
  }

  @Get('myarticles')
  @UseGuards(JwtAuthGuard)
  async getArticlesByAuthor(@User() user): Promise<Article[]> {
    return await this.articleService.getArticleByAuthor(user);
  }

  @Get(':id')
  async getarticleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Article> {
    return await this.articleService.getArticleById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArticle(
    @Body() articleData: AddArticleDto,
    @User() user,
  ): Promise<Article> {
    return await this.articleService.createArticle(articleData, user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateArticle(
    @Body() updateArticle: UpdateArticleDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Article> {
    return await this.articleService.UpdateArticle(id, updateArticle);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.softDeleteArticle(id);
  }
}
