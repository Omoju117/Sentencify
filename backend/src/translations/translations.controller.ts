import { TranslateRequestBody } from 'schemas/api';
import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class TranslationsController {
  @Post('translation')
  async translate(@Body() body: TranslateRequestBody): Promise<string> {
    let result = '';

    if (body.text && body.targetLang) {
      const config = {
        headers: {
          Authorization: process.env.DEEPL_API_KEY,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const params = {
        text: body.text,
        target_lang: body.targetLang,
      };

      console.log('params', params);
      await axios
        .post('https://api-free.deepl.com/v2/translate', params, config)
        .then((res) => {
          result = res.data;
        })
        .catch((err) => {
          console.log('error occurred when translating: ', err);
        });
    }
    return result;
  }
}
