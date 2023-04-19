import { UserService } from './user.service';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { LoginRequestBody, RegisterRequestBody } from 'schemas';
import { JwtService } from 'src/services/jwt.service';
import { Request, Response } from 'express';

@Controller()
export class UserController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  @Post('login')
  async login(
    @Body() body: LoginRequestBody,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    // TODO: error handling
    const isExist = await this.userService.findUser(body);
    const token = await this.jwtService.generateToken(body.email);
    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return isExist ? token : '';
  }
  @Post('register')
  async register(
    @Body() body: RegisterRequestBody,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const newUser = await this.userService.createUser(body);
    const token = await this.jwtService.generateToken(newUser.email);
    // NOTE: For security reason
    // フロントでJSから操作できないようにhttp-onlyでセットする
    response.cookie('token', token, { httpOnly: true });
    return token;
  }

  @Post('verifyToken')
  async verifyToken(@Req() request: Request): Promise<string> {
    const result = await this.jwtService.verifyToken(request.cookies['token']);
    return result ? 'success' : 'failed';
  }
}
