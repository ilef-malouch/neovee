import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Article } from './entities/article.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddArticleDto } from './dto/AddArticle.dto';
import { UpdateArticleDto } from './dto/UpdateArticle.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async createArticle(articleData: AddArticleDto, user): Promise<Article> {
    try {
      const newArticle = await this.articleRepository.create(articleData);
      newArticle.author = user;
      return await this.articleRepository.save(newArticle);
    } catch (error) {
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la création de l'article.",
      );
    }
  }

  async getArticleByAuthor(user): Promise<Article[]> {
    const articles = await this.articleRepository.findBy({ author: user });
    if (!articles) {
      throw new NotFoundException(`Cet utilisateur n'a aucun article!`);
    }
    return articles;
  }

  async getAllArticles(): Promise<Article[]> {
    const articles = await this.articleRepository.find();
    if (!articles) {
      throw new NotFoundException('Aucun article trouvé');
    }
    return articles;
  }

  async getArticleById(articleId: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (!article) {
      throw new NotFoundException(`L'article d'id ${articleId} n'existe pas`);
    }
    return article;
  }

  async UpdateArticle(id: number, article: UpdateArticleDto): Promise<Article> {
    const newArticle = await this.articleRepository.preload({
      id,
      ...article,
    });
    if (!newArticle) {
      throw new NotFoundException(`L'article d'id ${id} n'existe pas`);
    }
    return await this.articleRepository.save(newArticle);
  }

  async deleteArticle(articleId: number) {
    return await this.articleRepository.delete(articleId);
  }

  async softDeleteArticle(articleId: number) {
    return this.articleRepository.softDelete(articleId);
  }
  async restoreArticle(articleId: number) {
    return await this.articleRepository.restore(articleId);
  }
}
