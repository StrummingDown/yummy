import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { PrismaService } from 'src/prisma.service';
import { handleFileUpload } from './awsUploader';
@Resolver()
export class FileResolver {
  constructor(private prisma: PrismaService) {}

  @Mutation()
  async uploadFile(
    @Args('file')
    file: Promise<FileUpload[]>,
  ): Promise<Boolean> {
    const response = await handleFileUpload(file);
    console.log('response');
    console.log(response);

    return true;
  }
}
