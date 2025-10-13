import { Hash, createHash, randomBytes } from "node:crypto";
import { IService } from "../utils";
import { IHashingOptions } from "./interfaces";

export class HashingService
  implements IService<IHashingOptions, HashingService>
{
  private readonly options: IHashingOptions;

  constructor(options?: IHashingOptions) {
    this.options = options;
    if (!this.options) {
      this.options = {};
    }
    if (!this.options.saltSize) {
      this.options.saltSize = 32;
    }
    if (!this.options.otpCodeLen) {
      this.options.otpCodeLen = 8;
    }
    if (!this.options.hashAlg) {
      this.options.hashAlg = "sha-512";
    }
  }

  get config(): IHashingOptions {
    return this.options;
  }

  get instance(): HashingService {
    return this;
  }

  randomString(size = 32): string {
    return randomBytes(size).toString("hex");
  }

  randomPin(): number {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const pin = Math.floor(min + Math.random() * (max - min + 1));
    return pin;
  }

  saltAndHashPassword(password: string, salt: string): string {
    const hash: Hash = createHash("sha512");
    const saltedPassword = `${salt}-+-${password}`;
    hash.update(saltedPassword, "utf-8");
    hash.copy();
    const hashedPassword: string = hash.digest("hex");
    return hashedPassword;
  }
}
