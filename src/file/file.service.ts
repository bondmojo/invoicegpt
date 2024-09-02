import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileEntity } from './entitites/file.entity';
import { S3Service } from './s3.service';


@Injectable()
export class FileService {
    private readonly uploadPath = join(__dirname, '..', 'uploads');

    constructor(
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        private readonly s3Service: S3Service
    ) {
        //fs.mkdir(this.uploadPath, { recursive: true }).catch(console.error);
    }

    async saveFile(file: Express.Multer.File): Promise<any> {
        const uniqueId = uuidv4();
        console.log("File name=" + file.originalname);

        //const fileExtension = file.originalname.split('.').pop();
        //const fileName = `${uniqueId}.${fileExtension}`;
        //const filePath = join(this.uploadPath, fileName);
        //await fs.writeFile(filePath, file.buffer);

        const fileUrl = await this.s3Service.uploadFile(file);

        const fileEntity = this.fileRepository.create({
            id: uniqueId,
            //path: filePath,
            path: fileUrl,
            originalName: file.originalname,
        });

        await this.fileRepository.save(fileEntity);

        return { id: uniqueId, url: fileUrl };
    }

    async getFileByUuid(uuid: string): Promise<any> {
        const fileRecord = await this.fileRepository.findOne({ where: { id: uuid } });

        if (!fileRecord) {
            throw new NotFoundException('File not found');
        }

        //return fs.readFile(fileRecord.path);
        return { id: fileRecord.id, url: fileRecord.path };
    }

    async getAllUuids(): Promise<{ id: string; originalName: string }[]> {
        const files = await this.fileRepository.find({
            select: ['id', 'originalName', 'path'], // Select only the 'id' field, which contains the UUID
        });
        return files;
    }

    async getFilePathByUuid(uuid: string): Promise<string> {
        const file = await this.fileRepository.findOne({ where: { id: uuid } });
        if (!file) {
            throw new Error('File not found');
        }
        return file.path;
    }
}
