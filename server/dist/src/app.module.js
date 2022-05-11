"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const prisma_service_1 = require("./prisma.service");
const user_resolver_1 = require("./user.resolver");
const recipe_resolver_1 = require("./recipe.resolver");
const mailer_1 = require("@nestjs-modules/mailer");
const content_resolver_1 = require("./content.resolver");
const Like_resolver_1 = require("./Like.resolver");
const graphql_upload_1 = require("graphql-upload");
const img_resolver_1 = require("../uploads/img.resolver");
const material_resolver_1 = require("./material.resolver");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply((0, graphql_upload_1.graphqlUploadExpress)()).forRoutes('graphql');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.ACCESS_SECRET,
                signOptions: { expiresIn: '60h' },
            }),
            graphql_1.GraphQLModule.forRoot({
                typePaths: ['./**/*.graphql'],
                driver: apollo_1.ApolloDriver,
                cors: {
                    origin: true,
                    credentials: true,
                    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
                },
                uploads: false,
                context: ({ req }) => {
                    const token = req.headers.authorization.split(' ')[1] || undefined;
                    return { token };
                },
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'Naver',
                    host: 'smtp.naver.com',
                    port: 587,
                    auth: {
                        user: 'malove0330@naver.com',
                        pass: process.env.MAIL_PASSWORD,
                    },
                },
            }),
        ],
        providers: [
            prisma_service_1.PrismaService,
            user_resolver_1.UserResolver,
            recipe_resolver_1.RecipeResolver,
            material_resolver_1.MaterialResolver,
            content_resolver_1.ContentResolver,
            Like_resolver_1.LikeResolver,
            img_resolver_1.FileResolver,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map