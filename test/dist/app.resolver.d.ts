import { UserService } from './user.service';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';
export declare class AppResolver {
    private readonly userService;
    private readonly postService;
    constructor(userService: UserService, postService: PostService);
    getPostById(id: string): Promise<PostModel>;
}
