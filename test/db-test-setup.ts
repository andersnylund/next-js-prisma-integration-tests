import prisma from '../src/prisma';

export const cleanUp = async (): Promise<void> => {
  await prisma.post.deleteMany();
};
