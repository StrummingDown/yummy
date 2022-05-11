import { Likes } from '@prisma/client';
import { PrismaService } from './prisma.service';
export declare class LikeResolver {
    private prisma;
    constructor(prisma: PrismaService);
    getAllLike(): Promise<Likes[]>;
    Like(recipeId: number, userId: number): Promise<Likes>;
}
