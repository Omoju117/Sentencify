import { Injectable } from '@nestjs/common';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/types/user.type';
import { RegisterRequestBody } from 'schemas';
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(private readonly executeQueryService: ExecuteQueryService) {}

  async createUser(param: RegisterRequestBody): Promise<User> {
    const result = await this.executeQueryService.execute(async () => {
      const newUser = await prisma.user.create({
        data: {
          email: param.email,
          password: param.password,
        },
      });

      return newUser;
    });
    return result;
  }

  async findUser(user: User): Promise<boolean> {
    const result = await this.executeQueryService.execute(async () => {
      const foundUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      console.log('foundUser', foundUser);
      return foundUser ?? false;
    });
    return result;
  }
}
