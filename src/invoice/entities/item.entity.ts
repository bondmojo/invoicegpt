import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity()
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    item: string;

    @Column({ nullable: true })
    hsn_code: string;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unit_price: number;



    //@Column('decimal', { precision: 10, scale: 2 })
    //sgst: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => InvoiceEntity, invoice => invoice.items)
    invoice: InvoiceEntity;
}


