import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ItemEntity } from './item.entity';
import { FileEntity } from '../../file/entitites/file.entity';  // Import the File entity from the file module

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_number: string;

  @Column()
  date: string;

  @OneToOne(() => CustomerEntity, { cascade: true })
  @JoinColumn()
  bill_to: CustomerEntity;

  @OneToMany(() => ItemEntity, item => item.invoice, { cascade: true })
  items: ItemEntity[];

  @Column()
  currency: string;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  tax_rate: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  cgst_tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  sgst_tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  igst_tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total_tax_amount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  grand_total: number;

  @ManyToOne(() => FileEntity)
  @JoinColumn()
  invoice_image_id: FileEntity;  // Foreign key to File entity
}
