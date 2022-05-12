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
exports.MaterialResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const axios_1 = require("axios");
const materialList_1 = require("../uploads/materialList");
const prisma_service_1 = require("./prisma.service");
let MaterialResolver = class MaterialResolver {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllMaterial() {
        try {
            return this.prisma.materials.findMany({});
        }
        catch (err) {
            console.log(err);
        }
    }
    async createMaterial(info) {
        try {
            return this.prisma.materials.create({ data: info });
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateMaterial(info) {
        return this.prisma.materials.update({
            where: { id: info.id },
            data: info,
        });
    }
    async setMaterial2() {
        for (let i in materialList_1.materials) {
            console.log(i);
            await this.prisma.materials.create({
                data: { name: i, img: materialList_1.materials[i] },
            });
        }
        return;
    }
    async setMaterial() {
        console.log('진입');
        const { data: { COOKRCP01: { row }, }, } = await axios_1.default.get('https://openapi.foodsafetykorea.go.kr/api/f27d69e93170486c8c6e/COOKRCP01/json/1/50');
        row.map(async (el, idx) => {
            const recipe = await this.prisma.recipes.create({
                data: {
                    title: el.RCP_NM,
                    materials: el.RCP_PARTS_DTLS,
                    user: {
                        connect: { id: 1 },
                    },
                },
                include: {
                    user: true,
                    contents: true,
                    likes: true,
                },
            });
            for (let i = 1; i <= 20; i++) {
                let num = String(i).padStart(2, '0');
                let explain = `MANUAL${num}`;
                let img = `MANUAL_IMG${num}`;
                if (el[explain] !== '') {
                    if (i === 1 && el[img] === '') {
                        el[img] = el.ATT_FILE_NO_MAIN;
                    }
                    await this.prisma.contents.create({
                        data: {
                            recipe: {
                                connect: { id: recipe.id },
                            },
                            img: el[img],
                            explain: el[explain],
                        },
                    });
                }
            }
            console.log('완료');
        });
        try {
            return;
        }
        catch (err) {
            console.log(err);
        }
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "getAllMaterial", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "createMaterial", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "updateMaterial", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "setMaterial2", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "setMaterial", null);
MaterialResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaterialResolver);
exports.MaterialResolver = MaterialResolver;
//# sourceMappingURL=material.resolver.js.map