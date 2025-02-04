import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from '../todo/todo.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>, // Anslut till games repository
    ) { }

    // Skapa ett nytt spel
    async create(game: Game): Promise<Game> {
        return this.gamesRepository.save(game);
    }

    // Hämta alla spel
    async findAll(): Promise<Game[]> {
        return this.gamesRepository.find();
    }

    // Hämta ett specifikt spel med id
    async findOne(id: number): Promise<Game> {
        return this.gamesRepository.findOne({ where: { id } });
    }

    // Uppdatera ett spel
    async update(id: number, game: Game): Promise<Game> {
        await this.gamesRepository.update(id, game);
        return this.findOne(id);
    }

    // Ta bort ett spel
    async remove(id: number): Promise<void> {
        await this.gamesRepository.delete(id);
    }
}
