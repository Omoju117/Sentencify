import { Controller, Get } from '@nestjs/common';
import { AppService, SampleScheme } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): SampleScheme {
    console.log('request has been received');
    const test = this.appService.getHello();
    console.log('return value is', test);
    return test;
  }
}
