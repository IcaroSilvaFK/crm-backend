import { hash, verify } from 'argon2';

export class HashUtils {
  static async makeHash(plainTxt: string) {
    if (!plainTxt) {
      throw new Error('Invalid string');
    }

    const txtHash = await hash(plainTxt);

    return txtHash;
  }

  static async verifyHash(hash: string, plain: string) {
    return verify(hash, plain);
  }
}
