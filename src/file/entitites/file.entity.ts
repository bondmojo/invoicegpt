import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @Column()
    originalName: string;
}
