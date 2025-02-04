import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../todo/todo.entity';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todosRepository: Repository<Todo>, // Anslut till todos repository
    ) { }

    // Skapa ett nytt spel
    async create(todo: Todo): Promise<Todo> {
        return this.todosRepository.save(todo);
    }

    // Hämta alla spel
    async findAll(): Promise<Todo[]> {
        return this.todosRepository.find();
    }

    // Hämta ett specifikt spel med id
    async findOne(id: number): Promise<Todo> {
        return this.todosRepository.findOne({ where: { id } });
    }

    // Uppdatera ett spel
    async update(id: number, todo: Todo): Promise<Todo> {
        await this.todosRepository.update(id, todo);
        return this.findOne(id);
    }

    // Ta bort ett spel
    async remove(id: number): Promise<void> {
        await this.todosRepository.delete(id);
    }
}
