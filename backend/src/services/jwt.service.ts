import { Injectable } from '@nestjs/common';
import { Base64 } from 'js-base64';

// TODO: CSRF対策
// https://zenn.dev/marokanatani/articles/d0777a34641d22
@Injectable()
export class JwtService {
  async generateToken(userId: string): Promise<string> {
    const { createHmac } = await import('node:crypto');
    const base64 = (json) => {
      const jsonStr = JSON.stringify(json);
      return Base64.encode(jsonStr);
    };

    const HMAC_SHA256 = (key: string, data: string) => {
      const hash = createHmac('sha256', key).update(data).digest('base64');
      const hashNoPadding = hash.replace(/={1,2}$/, '');
      return hashNoPadding;
    };

    const epoch = () => {
      const today = new Date().toString();
      const timestamp = Date.parse(today);
      return timestamp;
    };

    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { sub: userId, iat: epoch() };
    const key = process.env.JWT_SECRET_KEY;
    const unsignedToken = `${base64(header)}.${base64(payload)}`;
    const signature = HMAC_SHA256(key, unsignedToken);
    const jwt = `${unsignedToken}.${signature}`;

    return jwt;
  }

  async verifyToken(token: string): Promise<boolean> {
    const { createHmac } = await import('node:crypto');
    const HMAC_SHA256 = (key: string, data: string) => {
      const hash = createHmac('sha256', key).update(data).digest('base64');
      const hashNoPadding = hash.replace(/={1,2}$/, '');
      return hashNoPadding;
    };

    const key = process.env.JWT_SECRET_KEY;

    const splits = token.split('.');
    const unsignedToken = [splits[0], splits[1]].join('.');
    const signature = splits[2];

    return HMAC_SHA256(key, unsignedToken) === signature;
  }

  async getIdFromToken(token: string): Promise<string> {
    console.log('token:', token);
    // TODO: cross-domainでcookieを使える状態にできていないため、一時的に固定ユーザーを返す
    if (!token) {
      return 'testFlyUser@endo.com';
    }
    if (await this.verifyToken(token)) {
      const splits = token.split('.');
      const decodedPayload = Base64.decode(splits[1]);
      const decodedUserEmail = JSON.parse(decodedPayload).sub;
      console.log('decodedUserEmail: ', decodedUserEmail);
      return decodedUserEmail;
    }
    return '';
  }
}
