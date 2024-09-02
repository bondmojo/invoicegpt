import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    gstin: string;
}