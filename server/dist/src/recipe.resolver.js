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
exports.RecipeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("./prisma.service");
let RecipeResolver = class RecipeResolver {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async getAllRecipe() {
        try {
            return this.prisma.recipes.findMany({
                include: {
                    likes: true,
                    contents: true,
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async getRecipe(id, token) {
        try {
            return this.prisma.recipes.findUnique({
                where: { id },
                include: {
                    user: true,
                    likes: true,
                    contents: {
                        orderBy: {
                            id: 'asc',
                        },
                    },
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async searchRecipe(materialName, page, token) {
        try {
            let ex = await this.prisma.recipes.findMany({
                skip: page * 5,
                take: 5,
                where: {
                    AND: materialName.map((el) => {
                        return { materials: { contains: el } };
                    }),
                },
                include: {
                    user: true,
                    contents: true,
                    likes: true,
                },
            });
            let userInfo = {};
            if (token) {
                userInfo = this.jwtService.verify(token);
            }
            const exe = { userInfo, recipeList: ex };
            return exe;
        }
        catch (err) {
            console.log(err);
        }
    }
    async createRecipe(info, token) {
        try {
            const { title, materials } = info;
            const userInfo = this.jwtService.verify(token);
            return this.prisma.recipes.create({
                data: {
                    title,
                    materials,
                    user: {
                        connect: { id: userInfo.id },
                    },
                },
                include: {
                    user: true,
                    contents: true,
                    likes: true,
                },
            });
        }
        catch (err) {
            console.log(err);
            throw new Error('로그인을 다시해주세요');
        }
    }
    async updateRecipe(info) {
        try {
            const { id, title } = info;
            return this.prisma.recipes.update({
                where: { id },
                data: { title },
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async deleteRecipe(id) {
        try {
            await this.prisma.recipes.delete({ where: { id } });
            await this.prisma.contents.deleteMany({ where: { recipeId: id } });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getAllRecipe", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Context)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "getRecipe", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('materialName')),
    __param(1, (0, graphql_1.Args)('page')),
    __param(2, (0, graphql_1.Context)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number, String]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "searchRecipe", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __param(1, (0, graphql_1.Context)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "createRecipe", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('info')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "updateRecipe", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "deleteRecipe", null);
RecipeResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
//# sourceMappingURL=recipe.resolver.js.map