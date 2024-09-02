import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGptModule } from './chatgpt/chatgpt.module';
import { FilesModule } from './file/file.module';
import { InvoiceModule } from './invoice/invoice.module';
import { FileEntity } from './file/entitites/file.entity';
import { InvoiceEntity } from './invoice/entities/invoice.entity';
import { CustomerEntity } from './invoice/entities/customer.entity';
import { ItemEntity } from './invoice/entities/item.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //localhsot
      port: 55000, // from localhost
      database: 'postgres',  //from localhost
      //host: 'db', //from docker
      //port: 5432, // from docker
      //database: 'invoicegpt-devdb', //from docker
      username: 'postgres',
      password: 'postgres',
      entities: [FileEntity, InvoiceEntity, CustomerEntity, ItemEntity], // Register the entity
      "migrations": ["dist/migration/**/*.ts"],
      "migrationsRun": true, // Automatically run migrations on startup
      synchronize: true
    }),
    FilesModule, ChatGptModule, InvoiceModule
  ],
})
export class AppModule { }
