export class ClientError extends Error {
  constructor(message: string, private readonly type: string) {
    super(message);
  }
}