import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceEntity } from './entities/invoice.entity';

@Controller('invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Post()
    create(@Body() invoice: InvoiceEntity) {
        console.log("Creating Invoice ", JSON.stringify(invoice));
        return this.invoiceService.create(invoice);
    }

    @Get()
    findAll() {
        return this.invoiceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.invoiceService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() invoice: InvoiceEntity) {
        return this.invoiceService.update(+id, invoice);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.invoiceService.remove(+id);
    }
}
