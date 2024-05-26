import { randomUUID } from 'node:crypto';

export class UuidUtils {
  static generateUUID() {
    return randomUUID();
  }
}
