export interface IEncryptionDetails {
  id: number;
  secret: string;
  algorithm: string;
  key: Buffer;
  iv: Buffer;
}

export interface IHashingOptions {
  saltSize?: number;
  otpCodeLen?: number;
  hashAlg?: string;
}
