import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
    private s3Client: S3Client;
    private bucketName: string;
    private accessKeyId = process.env.S3_ACCESS_KEY;
    private secretAccessKey = process.env.S3_SECRET_KEY;

    constructor() {
        this.s3Client = new S3Client({
            region: 'ap-southeast-1', // e.g., 'us-east-1'
            credentials: {
                accessKeyId: this.accessKeyId,  //process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: this.secretAccessKey // process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        this.bucketName = 'invoicegpt-dev';
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileKey = `${uuidv4()}-${file.originalname}`;

        const params = {
            Bucket: this.bucketName,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await this.s3Client.send(command);

        return `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;
    }
}
