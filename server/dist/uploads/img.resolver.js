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
exports.FileResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const prisma_service_1 = require("../src/prisma.service");
const awsUploader_1 = require("./awsUploader");
let FileResolver = class FileResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadFile(file) {
        const response = await (0, awsUploader_1.handleFileUpload)(file);
        console.log('response');
        console.log(response);
        return true;
    }
};
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Promise]),
    __metadata("design:returntype", Promise)
], FileResolver.prototype, "uploadFile", null);
FileResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FileResolver);
exports.FileResolver = FileResolver;
//# sourceMappingURL=img.resolver.js.map