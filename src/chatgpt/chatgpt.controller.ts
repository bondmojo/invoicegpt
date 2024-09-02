import { Controller, Post, Param, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatGptService } from './chatgpt.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FileService } from '../file/file.service';  // Import FileService
import { Logger } from '@nestjs/common';



@Controller('chatgpt')
export class ChatGptController {
    private readonly logger = new Logger(ChatGptService.name);

    constructor(private readonly chatGptService: ChatGptService,
        private readonly fileService: FileService,  // Inject FileService
    ) { }

    @Post('getChatGptCompletion/:uuid')
    async uploadFileByUuid(@Param('uuid') uuid: string, @Body() reqBody) {
        // Retrieve file path using FileService
        let imgUrl;
        try {
            imgUrl = await this.fileService.getFilePathByUuid(uuid);
        }
        catch {
            return { "Error": `Invalid File Id: ${uuid}. File Does not exist.` }
        };
        const isDummyData = reqBody.dummy_data;
        this.logger.log("CHATGPT filepath=" + imgUrl + " reqbody " + isDummyData);

        if (isDummyData) {
            return JSON.parse(process.env.SAMPLE_DATA);
        }
        // Call ChatGPT API with the file
        const response = await this.chatGptService.getCompletionFromImage(imgUrl);
        const invData = JSON.parse(response.choices[0].message.content);
        this.logger.log(response.choices[0].message.content);

        invData.invoice_image_id = uuid;
        invData.invoice_image_url = imgUrl;
        return invData;
    }
}
