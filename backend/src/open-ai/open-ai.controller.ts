import { OpenAiService } from './open-ai.service';
import { Body, Controller, Put } from '@nestjs/common';

@Controller()
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}
  @Put('getOtherPhrase')
  async updateDocument(@Body('phrase') phrase: string): Promise<string> {
    console.log('received phrase is: ', phrase);
    const generatedPhrase = await this.openAiService.getOtherPhrase(phrase);
    return generatedPhrase;
  }
}
