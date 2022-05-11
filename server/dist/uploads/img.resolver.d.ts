import { FileUpload } from 'graphql-upload';
import { PrismaService } from 'src/prisma.service';
export declare class FileResolver {
    private prisma;
    constructor(prisma: PrismaService);
    uploadFile(file: Promise<FileUpload[]>): Promise<Boolean>;
}
