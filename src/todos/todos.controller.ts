import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '../todo/todo.entity';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    // Hämta alla spel
    @Get()
    findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    // Hämta ett spel med specifikt id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Todo> {
        const todo = await this.todosService.findOne(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }

    // Skapa ett nytt spel
    @Post()
    async create(@Body() todo: Todo): Promise<Todo> {
        // Skapa en instans av Todo och lägg till data
        const newTodo = Object.assign(new Todo(), todo);

        // Validera objektet
        const errors = await validate(newTodo);
        if (errors.length > 0) {
            // Extrahera och formatera felmeddelanden
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }
        // Om valideringen lyckas, fortsätt skapa spelet
        return this.todosService.create(newTodo);
    }

    // Uppdatera ett spel
    @Put(':id')
    async update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
        const existingTodo = await this.todosService.findOne(id);
        if (!existingTodo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }

        // Validera inkommande uppdateringar
        const updatedTodo = Object.assign(existingTodo, todo);
        const errors = await validate(updatedTodo);
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.todosService.update(id, updatedTodo);
    }


    // Ta bort ett spel
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const todo = await this.todosService.findOne(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return this.todosService.remove(id);
    }

}
