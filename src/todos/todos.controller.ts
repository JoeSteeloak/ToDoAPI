import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '../todo/todo.entity';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) { }

    // Hämta alla poster
    @Get()
    findAll(): Promise<Todo[]> {
        return this.todosService.findAll();
    }

    // Hämta en post med specifikt id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Todo> {
        const todo = await this.todosService.findOne(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }

    // Skapa en ny post
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

    // Uppdatera en post
    @Put(':id')
    async update(@Param('id') id: number, @Body() partialTodo: Partial<Todo>): Promise<Todo> {
        const existingTodo = await this.todosService.findOne(id);
        if (!existingTodo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
    
        // Uppdatera endast de fält som skickas i body
        Object.assign(existingTodo, partialTodo);
    
        // Validera endast om nödvändiga fält finns kvar
        const errors = await validate(existingTodo);
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }
    
        return this.todosService.update(id, existingTodo);
    }
    


    // Ta bort en post
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const todo = await this.todosService.findOne(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return this.todosService.remove(id);
    }

}
