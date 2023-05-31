import { ClientError } from "./client.error";

export class ApiRequestError extends ClientError {
  constructor(message: string) {
    super(message, ApiRequestError.name);
  }
}