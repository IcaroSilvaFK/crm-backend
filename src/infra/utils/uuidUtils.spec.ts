/* eslint-disable @typescript-eslint/no-var-requires */
import { UuidUtils } from './uuidUtils';

describe('#UuidUtils', () => {
  describe('#GenerateUUID', () => {
    it('Should call randomUUID function from node crypto', () => {
      const crypto = require('node:crypto');

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('123-123-123-123-123');

      const result = UuidUtils.generateUUID();
      const expected = '123-123-123-123-123';
      expect(result).toBe(expected);
    });
  });
});
