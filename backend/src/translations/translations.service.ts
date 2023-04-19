import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslationsService {
  async translate(text: string, targetLang: string): Promise<string> {
    let result = '';
    const config = {
      headers: {
        Authorization: process.env.DEEPL_API_KEY,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const params = {
      text,
      target_lang: targetLang,
    };

    console.log('params', params);
    await axios
      .post('https://api-free.deepl.com/v2/translate', params, config)
      .then((res) => {
        // TODO: fix here
        result = res.data.translations[0].text;
      })
      .catch((err) => {
        console.log('error occurred when translating: ', err);
      });
    return result;
  }
}
