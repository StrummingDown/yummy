import { MailerService } from '@nestjs-modules/mailer';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { handleFileUpload } from 'uploads/awsUploader';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

process.env.ACCESS_SECRET;
@Resolver()
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private readonly jwtService: JwtService,
  ) {}

  @Query()
  async getAllUser(): Promise<Users[]> {
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
    } catch (err) {
      console.log(err);
    }
  }

  @Query()
  async getUser(
    @Context('token')
    token: string,
  ): Promise<Users> {
    try {
      console.log('1');
      const userInfo = this.jwtService.verify(token);
      console.log('2', userInfo);

      return this.prisma.users.findUnique({
        where: { id: userInfo.id },
        include: {
          recipes: true,
          likes: { include: { user: true, recipe: true } },
        },
      });
    } catch (err) {
      console.log('3', err);
      throw new Error('로그인을 다시해주세요');
    }
  }

  @Mutation()
  async joinUser(@Args('info') info: Users): Promise<Users> {
    try {
      info.password = await bcrypt.hash(info.password, 3);

      if (info.img) {
        const result = await handleFileUpload(info['img']);

        info.img = result['Location'];
      }

      return this.prisma.users.create({ data: info });
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation()
  async emailCertify(@Args('email') email: string): Promise<Number> {
    try {
      const existUser = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });

      if (!existUser) {
        let number = Math.floor(Math.random() * 1000000) + 100000; // ★★난수 발생 ★★★★★
        if (number > 1000000) {
          number = number - 100000;
        }

        await this.mailerService.sendMail({
          from: 'malove0330@naver.com', //보내는 주소 입력
          to: `${email}`, //위에서 선언해준 받는사람 이메일
          subject: '안녕하세요', //메일 제목
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
      } else {
        return 0;
      }
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation()
  async updateUser(@Args('info') info: Users): Promise<Users> {
    try {
      return this.prisma.users.update({ where: { id: info.id }, data: info });
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation()
  async deleteUser(@Args('id') id: number): Promise<Boolean> {
    try {
      await this.prisma.users.delete({ where: { id } });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation()
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
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
    } catch (err) {
      console.log(err);
    }
  }
  @Query()
  async google(@Args('code') code: string): Promise<string> {
    try {
      const {
        data: { access_token },
      } = await axios.post(
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_SECRET}&redirect_uri=http://localhost:3000&grant_type=authorization_code`,
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
        },
        { withCredentials: true },
      );

      const {
        data: { email },
      } = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`,
        {
          headers: {
            authorization: `token ${access_token}`,
            accept: 'application/json',
          },
        },
      );

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
    } catch (err) {
      throw new Error('로그인을 다시해주세요');
    }
  }

  @Query()
  async kakao(@Args('code') code: string): Promise<string> {
    try {
      const {
        data: { access_token },
      } = await axios.post(
        `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT_ID}&grant_type=authorization_code&redirect_uri=http://localhost:3000`,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
        { withCredentials: true },
      );

      const {
        data: {
          kakao_account: {
            email,
            profile: { nickname },
          },
        },
      } = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
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
    } catch (err) {
      console.log(err);
      throw new Error('로그인을 다시해주세요');
    }
  }
}
