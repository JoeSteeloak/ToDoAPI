import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { TodosController } from './todos/todos.controller';
import { TodosService } from './todos/todos.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // Konvertera till number
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Todo],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false }, // SSL
      }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule { }
