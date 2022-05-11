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
exports.ContentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const awsUploader_1 = require("../uploads/awsUploader");
const prisma_service_1 = require("./prisma.service");
let ContentResolver = class ContentResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createContent(info, recipeId) {
        try {
            for (let content of info) {
                const response = await (0, awsUploader_1.handleFileUpload)(content.img);
                await this.prisma.contents.create({
                    data: {
                        recipe: {
                            connect: { id: recipeId },
                        },
                        img: response['Location'],
                        explain: content.explain,
                    },
                });
            }
            return true;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __param(1, (0, graphql_1.Args)('recipeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], ContentResolver.prototype, "createContent", null);
ContentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContentResolver);
exports.ContentResolver = ContentResolver;
//# sourceMappingURL=content.resolver.js.map