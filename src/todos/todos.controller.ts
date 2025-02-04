import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from '../todo/todo.entity';
import { validate } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: TodosService) { }

    // Hämta alla spel
    @Get()
    findAll(): Promise<Game[]> {
        return this.gamesService.findAll();
    }

    // Hämta ett spel med specifikt id
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Game> {
        const game = await this.gamesService.findOne(id);
        if (!game) {
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }
        return game;
    }

    // Skapa ett nytt spel
    @Post()
    async create(@Body() game: Game): Promise<Game> {
        // Skapa en instans av Game och lägg till data
        const newGame = Object.assign(new Game(), game);

        // Validera objektet
        const errors = await validate(newGame);
        if (errors.length > 0) {
            // Extrahera och formatera felmeddelanden
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }
        // Om valideringen lyckas, fortsätt skapa spelet
        return this.gamesService.create(newGame);
    }

    // Uppdatera ett spel
    @Put(':id')
    async update(@Param('id') id: number, @Body() game: Game): Promise<Game> {
        const existingGame = await this.gamesService.findOne(id);
        if (!existingGame) {
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }

        // Validera inkommande uppdateringar
        const updatedGame = Object.assign(existingGame, game);
        const errors = await validate(updatedGame);
        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {})).flat();
            throw new HttpException(
                { message: 'Validation failed', errors: errorMessages },
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.gamesService.update(id, updatedGame);
    }


    // Ta bort ett spel
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const game = await this.gamesService.findOne(id);
        if (!game) {
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }
        return this.gamesService.remove(id);
    }

}
