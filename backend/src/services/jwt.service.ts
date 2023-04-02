import { Injectable } from '@nestjs/common';

// TODO: CSRF対策
// https://zenn.dev/marokanatani/articles/d0777a34641d22
@Injectable()
export class JwtService {
  async generateToken(userId: string): Promise<string> {
    const { createHmac } = await import('node:crypto');
    const base64 = (json) => {
      const jsonStr = JSON.stringify(json);
      const jsonB64 = Buffer.from(jsonStr).toString('base64');
      const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '');
      return jsonB64NoPadding;
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
}
