import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsOptional, Length, IsIn } from 'class-validator';

const statuses = ['not started', 'in progress', 'finished'] as const;
export type Status = typeof statuses[number];

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
    @Length(1, 255, { message: 'Description must be between 1 and 255 characters long.' })
    description: string;

    @Column({ default: 'not started' })
    @IsString()
    @IsIn(statuses)
    status: string;
}
