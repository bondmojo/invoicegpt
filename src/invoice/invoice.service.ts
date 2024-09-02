import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceEntity } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(InvoiceEntity)
        private readonly invoiceRepository: Repository<InvoiceEntity>,
    ) { }

    findAll(): Promise<InvoiceEntity[]> {
        return this.invoiceRepository.find({ relations: ['bill_to', 'items', 'invoice_image_id'] });
    }

    findOne(id: number): Promise<InvoiceEntity> {
        return this.invoiceRepository.findOne({ where: { id }, relations: ['bill_to', 'items', 'invoice_image_id'] });
    }

    create(invoice: InvoiceEntity): Promise<InvoiceEntity> {
        return this.invoiceRepository.save(invoice);
    }

    async update(id: number, invoice: InvoiceEntity): Promise<InvoiceEntity> {
        await this.invoiceRepository.update(id, invoice);
        return this.invoiceRepository.findOne({ where: { id }, relations: ['bill_to', 'items', 'invoice_image_id'] });
    }

    async remove(id: number): Promise<void> {
        await this.invoiceRepository.delete(id);
    }
}
