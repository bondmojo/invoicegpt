import { DataSource } from 'typeorm';
import * as path from 'path';
import { FileEntity } from 'src/file/entitites/file.entity';
import { InvoiceEntity } from 'src/invoice/entities/invoice.entity';
import { ItemEntity } from 'src/invoice/entities/item.entity';
import { CustomerEntity } from 'src/invoice/entities/customer.entity';
import { Migrations1724682554075 } from 'src/1724682554075-migrations';
import { Migrations1724734792417 } from 'src/1724734792417-migrations';
import { Migrations1724738299884 } from 'src/1724738299884-migrations';

export const AppDataSource = new DataSource({
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": parseInt(process.env.DB_PORT),
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    //"migrations": ['src/migrations/*{.ts,.js}'],
    "migrations": [Migrations1724682554075, Migrations1724734792417, Migrations1724738299884],
    //migrations: [__dirname + '/../migrations/*{.ts,.js}'],

    //"entities": ['src/**/entities/**/ *.entity.{ ts, js }']
    "entities": [FileEntity, CustomerEntity, InvoiceEntity, ItemEntity]
});

