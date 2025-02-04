import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsOptional, Length } from 'class-validator';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @Length(1, 255, { message: 'Title must be between 1 and 255 characters long.' })
    title: string;

    @Column()
    @IsString()
    @IsOptional()
    @Length(1, 255, { message: 'description must be between 1 and 255 characters long.' })
    description: string;

    @Column()
    @IsString()
    status: string;
}
