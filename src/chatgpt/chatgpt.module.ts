import { Module } from '@nestjs/common';
import { ChatGptService } from './chatgpt.service';
import { ChatGptController } from './chatgpt.controller';
import { HttpModule } from '@nestjs/axios';
import { FilesModule } from '../file/file.module';  // Import FileModule


@Module({
    imports: [HttpModule, FilesModule],
    controllers: [ChatGptController],
    providers: [ChatGptService],
})
export class ChatGptModule { }
