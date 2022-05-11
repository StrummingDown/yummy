import { Contents } from '@prisma/client';
import { PrismaService } from './prisma.service';
export declare class ContentResolver {
    private prisma;
    constructor(prisma: PrismaService);
    createContent(info: Contents[], recipeId: number): Promise<boolean>;
}
