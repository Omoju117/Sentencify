import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class JwtService {
  generateToken(userId: string): string {
    const base64 = (json) => {
      const jsonStr = JSON.stringify(json);
      const jsonB64 = Buffer.from(jsonStr).toString('base64');
      const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, '');
      return jsonB64NoPadding;
    };

    const HMAC_SHA256 = (key, data) => {
      const hash = crypto
        .createHmac('sha256', key)
        .update(data)
        .digest('base64');
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

    console.log(jwt);
    return jwt;
  }
}
