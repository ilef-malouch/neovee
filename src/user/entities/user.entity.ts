import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../article/entities/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    length: 50,
    nullable: false,
  })
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Article, (article) => article.author, {
    cascade: true,
    nullable: true,
  })
  writtenArticles: Article[];

  @ManyToMany(() => Article, { cascade: true })
  likedArticles: Article[];
}
