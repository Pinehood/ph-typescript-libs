import { createCipheriv, createDecipheriv, scryptSync } from "node:crypto";
import { IService } from "../utils";
import { IEncryptionDetails } from "./interfaces";

export class EncryptionService
  implements IService<IEncryptionDetails[], EncryptionService>
{
  private readonly encryptions: IEncryptionDetails[];

  constructor() {
    this.encryptions = [];
  }

  get config(): IEncryptionDetails[] {
    return this.encryptions;
  }

  get instance(): EncryptionService {
    return this;
  }

  private get(id: number): IEncryptionDetails {
    return this.encryptions.find((e) => e.id === id);
  }

  add(id: number, secret: string, salt: string): void {
    this.encryptions.push({
      id,
      iv: Buffer.alloc(16, 0),
      algorithm: "aes-192-cbc",
      key: scryptSync(secret, salt, 24),
      secret,
    });
  }

  encrypt(id: number, text: string): string {
    try {
      const encryption = this.get(id);
      const cipher = createCipheriv(
        encryption.algorithm,
        encryption.key,
        encryption.iv,
      );
      let encrypted = cipher.update(text, "utf-8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    } catch (error: any) {
      return JSON.stringify(error);
    }
  }

  decrypt(id: number, text: string): string {
    try {
      const encryption = this.get(id);
      const decipher = createDecipheriv(
        encryption.algorithm,
        encryption.key,
        encryption.iv,
      );
      let decrypted = decipher.update(text, "hex", "utf-8");
      decrypted += decipher.final("utf-8");
      return decrypted;
    } catch (error: any) {
      return JSON.stringify(error);
    }
  }
}
