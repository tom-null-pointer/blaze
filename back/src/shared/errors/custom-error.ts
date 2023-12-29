export abstract class CustomError {
  httpCode: number;
  httpError: string;
  message?: string;
  protected constructor(message?: string) {
    this.message = message;
  }
}