import { Injectable } from '@nestjs/common';

export type SampleScheme = { result: string };

@Injectable()
export class AppService {
  getHello(): SampleScheme {
    return { result: 'Hello World! by Nest' };
  }
}
