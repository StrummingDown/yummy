import { Materials } from '@prisma/client';
import { PrismaService } from './prisma.service';
export declare class MaterialResolver {
    private prisma;
    constructor(prisma: PrismaService);
    getAllMaterial(): Promise<Materials[]>;
    createMaterial(info: Materials): Promise<Materials>;
    updateMaterial(info: Materials): Promise<Materials>;
    setMaterial2(): Promise<Materials>;
    setMaterial(): Promise<Materials>;
}
