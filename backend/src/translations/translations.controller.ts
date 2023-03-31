import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';

@Controller()
export class TranslationsController {
  // TODO: fix argument type after defining specification.
  @Post('translation')
  async translate(@Body() data: any): Promise<string> {
    let result = '';

    if (data.text && data.target_lang) {
      const config = {
        headers: {
          Authorization: process.env.DEEPL_API_KEY,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const params = {
        text: data.text,
        target_lang: data.target_lang,
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
