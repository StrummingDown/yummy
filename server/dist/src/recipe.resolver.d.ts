import { JwtService } from '@nestjs/jwt';
import { Recipes } from '@prisma/client';
import { PrismaService } from './prisma.service';
export declare class RecipeResolver {
    private prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getAllRecipe(): Promise<Recipes[]>;
    getRecipe(id: number, token: string): Promise<Recipes>;
    searchRecipe(materialName: string[], page: number, token: string): Promise<{}>;
    createRecipe(info: {
        title: string;
        materials: string;
    }, token: string): Promise<Recipes>;
    updateRecipe(info: {
        id: number;
        title: string;
    }): Promise<Recipes>;
    deleteRecipe(id: number): Promise<Boolean>;
}
