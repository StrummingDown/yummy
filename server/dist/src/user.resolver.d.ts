import { MailerService } from '@nestjs-modules/mailer';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserResolver {
    private prisma;
    private mailerService;
    private readonly jwtService;
    constructor(prisma: PrismaService, mailerService: MailerService, jwtService: JwtService);
    getAllUser(): Promise<Users[]>;
    getUser(token: string): Promise<Users>;
    joinUser(info: Users): Promise<Users>;
    emailCertify(email: string): Promise<Number>;
    updateUser(info: Users): Promise<Users>;
    deleteUser(id: number): Promise<Boolean>;
    login(email: string, password: string): Promise<string>;
    google(code: string): Promise<string>;
    kakao(code: string): Promise<string>;
}
