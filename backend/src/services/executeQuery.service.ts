import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ExecuteQueryService {
  async execute(cbQuery: any) {
    /** SQL実行箇所 */
    async function main() {
      // ... you will write your Prisma Client queries here
      const result = await cbQuery();
      return result;
    }

    return main()
      .then(async (result) => {
        console.log('result', result);
        await prisma.$disconnect();
        return result;
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }
}
