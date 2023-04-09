import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAiService {
  async getOtherPhrase(phrase: string): Promise<string> {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Make one sentence using the phrase "${phrase}".`,
    });
    console.log('OpenAI response: ', response.data);
    return response.data.choices[0].text;
  }
}
