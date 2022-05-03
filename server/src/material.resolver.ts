import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Materials } from '@prisma/client';
import axios from 'axios';
import { materials } from 'uploads/materialList';
import { PrismaService } from './prisma.service';

@Resolver()
export class MaterialResolver {
  constructor(private prisma: PrismaService) {}

  @Query()
  async getAllMaterial() {
    try {
      return this.prisma.materials.findMany({});
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation()
  async createMaterial(@Args('info') info: Materials): Promise<Materials> {
    try {
      return this.prisma.materials.create({ data: info });
    } catch (err) {
      console.log(err);
    }
  }
  @Mutation()
  async updateMaterial(@Args('info') info: Materials): Promise<Materials> {
    return this.prisma.materials.update({
      where: { id: info.id },
      data: info,
    });
  }

  @Mutation()
  async setMaterial2(): Promise<Materials> {
    for (let i in materials) {
      console.log(i);
      await this.prisma.materials.create({
        data: { name: i, img: materials[i] },
      });
    }
    return;
  }

  @Mutation()
  async setMaterial(): Promise<Materials> {
    console.log('진입');
    const {
      data: {
        COOKRCP01: { row },
      },
    } = await axios.get(
      'https://openapi.foodsafetykorea.go.kr/api/f27d69e93170486c8c6e/COOKRCP01/json/1/250',
    );

    row.map(async (el, idx) => {
      console.log(idx);
      const recipe = await this.prisma.recipes.create({
        data: {
          title: el.RCP_NM,
          materials: el.RCP_PARTS_DTLS,
          user: {
            connect: { id: 0 },
          },
        },
        include: {
          user: true,
          contents: true,
          likes: true,
        },
      });
      console.log(recipe.id);
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
        if (i === 20) {
          console.log('컨텐츠 마지막');
        }
      }
    });

    try {
      // return this.prisma.materials.create();
      return;
    } catch (err) {
      console.log(err);
    }
  }
}
/*title: RCP_NM
메인사진:ATT_FILE_NO_MAIN

MANUAL99:contents.explain
MANUAL_IMG99:contents.img

RCP_PARTS_DTLS:materials.name*/
