import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// type Post = {
//   // id: number;
//   title: string;
//   content: string;
//   createdAt: Date;
//   userId: number;
// };

class PostService {
  async createPost(data: any) {
    console.log(data);
    return prisma.post.create({
      data: {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        userId: data.userId,
      },
    });
  }

  async getPosts() {
    return prisma.post.findMany({
      include: { user: true },
    });
  }

  async getPost(id: number) {
    return prisma.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async updatePost(id: number, data: any) {
    return prisma.post.update({
      where: { id },
      data: data,
    });
  }

  async deletePost(id: number) {
    return prisma.post.delete({
      where: { id },
    });
  }
}

export default PostService;
