import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestBody, RegisterRequestBody } from 'schemas';
import { JwtService } from 'src/services/jwt.service';

@Controller()
export class UserController {
  constructor(private readonly jwtService: JwtService) {}
  @Post('login')
  login(@Body() body: LoginRequestBody): string {
    return this.jwtService.generateToken(body.id);
  }
  @Post('register')
  register(@Body() body: RegisterRequestBody): string {
    return this.jwtService.generateToken(body.id);
  }
}
