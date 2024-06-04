import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  async createUser(data: any) {
    return prisma.user.create({
      data,
    });
  }

  async getUsers() {
    return prisma.user.findMany({
      include: { posts: true },
    });
  }

  async getUser(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async updateUser(id: number, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  }
}

export default UserService;
