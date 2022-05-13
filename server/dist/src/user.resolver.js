"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("./prisma.service");
const bcrypt = require("bcrypt");
const awsUploader_1 = require("../uploads/awsUploader");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("axios");
process.env.ACCESS_SECRET;
let UserResolver = class UserResolver {
    constructor(prisma, mailerService, jwtService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async getAllUser() {
        try {
            return this.prisma.users.findMany({
                include: {
                    recipes: true,
                    likes: {
                        include: {
                            user: true,
                            recipe: true,
                        },
                    },
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async getUser(token) {
        try {
            if (token) {
                const userInfo = this.jwtService.verify(token);
                return this.prisma.users.findUnique({
                    where: { id: userInfo.id },
                    include: {
                        likes: {
                            include: {
                                recipe: {
                                    include: { contents: true, likes: true, user: true },
                                },
                            },
                        },
                        recipes: { include: { contents: true, likes: true, user: true } },
                    },
                });
            }
            else {
                return;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async joinUser(info) {
        try {
            info.password = await bcrypt.hash(info.password, 3);
            if (info.img) {
                const result = await (0, awsUploader_1.handleFileUpload)(info['img']);
                info.img = result['Location'];
            }
            return this.prisma.users.create({ data: info });
        }
        catch (err) {
            console.log(err);
        }
    }
    async emailCertify(email) {
        try {
            const existUser = await this.prisma.users.findUnique({
                where: {
                    email,
                },
            });
            if (!existUser) {
                let number = Math.floor(Math.random() * 1000000) + 100000;
                if (number > 1000000) {
                    number = number - 100000;
                }
                await this.mailerService.sendMail({
                    from: 'malove0330@naver.com',
                    to: `${email}`,
                    subject: '안녕하세요',
                    html: `<div
        style='
        text-align: center;
        width: 50%;
        height: 60%;
        margin: 15%;
        padding: 20px;
        box-shadow: 1px 1px 3px 0px #999;
        '>
        인증번호는 ${number} 입니다.
        <br/><br/><br/><br/></div>`,
                });
                return number;
            }
            else {
                return 0;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateUser(info) {
        try {
            if (info.img) {
                const result = await (0, awsUploader_1.handleFileUpload)(info['img']);
                info.img = result['Location'];
            }
            return this.prisma.users.update({ where: { id: info.id }, data: info });
        }
        catch (err) {
            console.log(err);
        }
    }
    async deleteUser(id) {
        try {
            await this.prisma.users.delete({ where: { id } });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
    async login(email, password) {
        try {
            const findUser = await this.prisma.users.findUnique({ where: { email } });
            if (findUser) {
                const passCheck = await bcrypt.compare(password, findUser.password);
                if (passCheck) {
                    const { id, email, nickName } = findUser;
                    const token = this.jwtService.sign({ id, email, nickName });
                    return token;
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async google(code) {
        try {
            const { data: { access_token }, } = await axios_1.default.post(`https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=http://localhost:3000&grant_type=authorization_code`, {
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
            }, { withCredentials: true });
            const { data: { email }, } = await axios_1.default.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`, {
                headers: {
                    authorization: `token ${access_token}`,
                    accept: 'application/json',
                },
            });
            let userInfo = await this.prisma.users.findUnique({
                where: { email },
            });
            if (!userInfo) {
                const nickName = Math.random()
                    .toString(36)
                    .replace(/[^a-z]+/g, '')
                    .substr(0, 5);
                const createUser = await this.prisma.users.create({
                    data: { email, nickName },
                });
                const token = this.jwtService.sign({
                    id: createUser.id,
                    email,
                    nickName,
                });
                return token;
            }
            const token = this.jwtService.sign({
                id: userInfo.id,
                email,
                nickName: userInfo.nickName,
            });
            return token;
        }
        catch (err) {
            throw new Error('로그인을 다시해주세요');
        }
    }
    async kakao(code) {
        try {
            const { data: { access_token }, } = await axios_1.default.post(`https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT_ID}&grant_type=authorization_code&redirect_uri=http://localhost:3000`, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            }, { withCredentials: true });
            const { data: { kakao_account: { email, profile: { nickname }, }, }, } = await axios_1.default.get(`https://kapi.kakao.com/v2/user/me`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
            });
            let userInfo = await this.prisma.users.findUnique({
                where: { email },
            });
            if (!userInfo) {
                const createUser = await this.prisma.users.create({
                    data: { email, nickName: nickname },
                });
                const token = this.jwtService.sign({
                    id: createUser.id,
                    email,
                    nickName: nickname,
                });
                return token;
            }
            const token = this.jwtService.sign({
                id: userInfo.id,
                email,
                nickName: userInfo.nickName,
            });
            return token;
        }
        catch (err) {
            console.log(err);
            throw new Error('로그인을 다시해주세요');
        }
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUser", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Context)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "joinUser", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "emailCertify", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "google", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "kakao", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService,
        jwt_1.JwtService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map