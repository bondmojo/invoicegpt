import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entitites/file.entity';
import { S3Service } from './s3.service';



@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  controllers: [FileController],
  providers: [FileService, S3Service],
  exports: [FileService],  // Export the FileService
})
export class FilesModule { }
