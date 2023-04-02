import { Module } from '@nestjs/common';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { JwtService } from 'src/services/jwt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [JwtService, UserService, ExecuteQueryService],
})
export class UserModule {}
