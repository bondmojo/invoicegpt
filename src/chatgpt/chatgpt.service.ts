import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common';



@Injectable()
export class ChatGptService {
    private readonly openaiUrl = 'https://api.openai.com/v1/chat/completions';
    private readonly apiKey = process.env.OPENAI_API_KEY; // Store your API key in environment variables
    //private readonly apiKey = "
    private readonly logger = new Logger(ChatGptService.name);

    constructor(private readonly httpService: HttpService) { }

    async getCompletionFromImage(imgUrl: string): Promise<any> {
        const SYSTEM_PROMPT = process.env.PROMPT_SYSTEM;
        const USER_PROMPT = process.env.PROMPT_USER;
        //const USER_PROMPT = process.env.PROMPT_BASE + process.env.PROMPT_TAX_EXPLAINATION + process.env.PROMPT_TAX_DETAILS + process.env.PROMPT_DISCOUNTS_DETAILS /*+ process.env.PROMT_JSON_FORMAT + process.env.PROMT_CLOSE*/;
        //this.logger.log(PROMPT);
        this.logger.log(this.apiKey);


        let data = JSON.stringify({
            "model": process.env.GPT_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": USER_PROMPT
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imgUrl
                            }
                        }
                    ]
                },

            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "invoice_data_extraction",
                    "schema": JSON.parse(process.env.PROMT_JSON_FORMAT)
                }
            },
            "max_tokens": 5000
        });

        this.logger.log(data);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
        };

        const response = await firstValueFrom(
            this.httpService.post(this.openaiUrl, data, { headers }),
        );

        return response.data;
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: `Failed to fetch invoice data: ${error.message}`
        }
        /*throw new HttpException(
            `Failed to fetch invoice data: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );*/
    }
}
