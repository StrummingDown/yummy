import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { PrismaService } from './prisma.service';
import { UserResolver } from './user.resolver';
import { RecipeResolver } from './recipe.resolver';
import { MailerModule } from '@nestjs-modules/mailer';
import { ContentResolver } from './content.resolver';
import { LikeResolver } from './Like.resolver';
import { graphqlUploadExpress } from 'graphql-upload';
import { FileResolver } from '../uploads/img.resolver';
import { MaterialResolver } from './material.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      //토큰 서명 값 설정
      secret: process.env.ACCESS_SECRET,
      //토큰 유효시간 (임의 60초)
      signOptions: { expiresIn: '60h' },
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      uploads: false,
      context: ({ req }) => {
        const token = req.headers.authorization.split(' ')[1] || undefined;

        return { token };
      },
    }),
    MailerModule.forRoot({
      transport: {
        service: 'Naver',
        host: 'smtp.naver.com',
        port: 587,
        auth: {
          user: 'malove0330@naver.com', //gmail주소입력
          pass: process.env.MAIL_PASSWORD, //gmail패스워드 입력
        },
      },
    }),
  ],
  providers: [
    PrismaService,
    UserResolver,
    RecipeResolver,
    MaterialResolver,
    ContentResolver,
    LikeResolver,
    // UseResolver,
    FileResolver,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
