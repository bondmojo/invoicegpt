import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log("file =" + file);
        const uniqueId = await this.fileService.saveFile(file);
        return { message: 'File uploaded successfully', id: uniqueId };
    }
    @Get(':uuid')
    async getFile(@Param('uuid') uuid: string, @Res() res: Response) {
        const file = await this.fileService.getFileByUuid(uuid);
        res.status(HttpStatus.OK).send(file);
    }

    @Get('fetch/allUuids')
    async getAllUuids() {
        const uuids = await this.fileService.getAllUuids();
        return { uuids };
    }
}
