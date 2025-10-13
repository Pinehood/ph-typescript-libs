import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { BASE_URL, ALGORITHM, JWT_ISSUER, BASE_SANDBOX_URL } from './constants';

export function token(
  method: string,
  path: string,
  key: string,
  secret: string,
  sandbox: boolean
): string {
  const uri = `${method} ${sandbox ? BASE_SANDBOX_URL : BASE_URL}${path}`;
  const payload = {
    iss: JWT_ISSUER,
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 120,
    sub: key,
    uri,
  };
  const header = {
    alg: ALGORITHM,
    kid: key,
    nonce: crypto.randomBytes(16).toString('hex'),
  };
  const options: jwt.SignOptions = {
    algorithm: ALGORITHM as jwt.Algorithm,
    header: header,
  };
  return jwt.sign(payload, secret as string, options);
}
