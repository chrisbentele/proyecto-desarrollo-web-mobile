import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    title: string;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    publicationYear: number;

    @Column()
    ISBN: string;
}
