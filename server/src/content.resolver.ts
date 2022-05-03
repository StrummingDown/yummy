import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Contents } from '@prisma/client';
import { handleFileUpload } from 'uploads/awsUploader';
import { PrismaService } from './prisma.service';

@Resolver()
export class ContentResolver {
  constructor(private prisma: PrismaService) {}

  @Query()
  async getRecipeContent(
    @Args('recipeId') recipeId: number,
  ): Promise<Contents[]> {
    return this.prisma.contents.findMany({
      where: { recipeId },
    });
  }

  @Mutation()
  async createContent(
    @Args('info') info: Contents[],
    @Args('recipeId') recipeId: number,
  ): Promise<boolean> {
    try {
      for (let content of info) {
        const response = await handleFileUpload(content.img);

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
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation()
  async updateContent(@Args('info') info: Contents[]): Promise<Number> {
    const { recipeId } = info[0];
    await this.prisma.contents.deleteMany({ where: { recipeId } });
    const ex = await this.prisma.contents.createMany({ data: info });
    return ex.count;
  }
}
