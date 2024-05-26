import { HashUtils } from './hashUtil';
import * as argon2 from 'argon2';

process.env = { DATABASE_URL: 'cascas', HASH_SECRET: '123' };

jest.mock('./env.ts', () => ({
  environments: {
    DATABASE_URL: 'cascas',
    HASH_SECRET: '123',
  },
}));

describe('#HastUtils', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('#makeHash', () => {
    it('Should make hash with valid params', async () => {
      jest.spyOn(argon2, 'hash').mockResolvedValue('123');

      const expected = '123';
      const hash = await HashUtils.makeHash('abc');

      expect(expected).toBe(hash);
    });

    it('Should not make hash when passed invalid params', async () => {
      expect(async () => await HashUtils.makeHash('')).rejects.toThrow();
    });
  });

  describe('#verifyHash', () => {
    it('Should returns true when passed valid params', async () => {
      const pass = '12345';

      const hash = await HashUtils.makeHash(pass);

      const result = await HashUtils.verifyHash(hash, pass);

      expect(result).toBe(true);
    });

    it('Should returns false when passed invalid password', async () => {
      const pass = '12345';
      const invalidPassword = '12344555545';

      const hash = await HashUtils.makeHash(pass);

      const result = await HashUtils.verifyHash(hash, invalidPassword);

      expect(result).toBe(false);
    });
  });
});
