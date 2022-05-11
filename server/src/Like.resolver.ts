import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Likes } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Resolver()
export class LikeResolver {
  constructor(private prisma: PrismaService) {}
  @Query()
  async getAllLike(): Promise<Likes[]> {
    return this.prisma.likes.findMany({
      include: {
        user: true,
        recipe: true,
      },
    });
  }
  @Mutation()
  async Like(
    @Args('recipeId') recipeId: number,
    @Args('userId') userId: number,
  ): Promise<Likes> {
    const liked = await this.prisma.likes.findMany({
      where: { userId, recipeId },
    });

    if (liked.length) {
      await this.prisma.likes.deleteMany({ where: { userId, recipeId } });
    } else {
      return this.prisma.likes.create({
        data: {
          recipe: { connect: { id: recipeId } },
          user: { connect: { id: userId } },
        },
      });
    }
  }
}
