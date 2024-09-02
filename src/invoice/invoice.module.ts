import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceEntity } from './entities/invoice.entity';
import { CustomerEntity } from './entities/customer.entity';
import { ItemEntity } from './entities/item.entity';
import { FileEntity } from '../file/entitites/file.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InvoiceEntity, CustomerEntity, ItemEntity, FileEntity])],
    controllers: [InvoiceController],
    providers: [InvoiceService],
})
export class InvoiceModule { }
