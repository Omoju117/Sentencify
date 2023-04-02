import { Module } from '@nestjs/common';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { JwtService } from 'src/services/jwt.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [JwtService, ExecuteQueryService],
})
export class UserModule {}
