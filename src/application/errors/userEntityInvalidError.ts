export class UserEntityInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserEntityInvalidError';
  }
}
