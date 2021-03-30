declare namespace NodeJS {
  export interface Global {
    prisma: typeof PrismaClient;
  }
}
