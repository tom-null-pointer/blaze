export abstract class CustomException extends Error {
  httpCode: number;
  httpError: string;
  message: string;
  protected constructor(message: string) {
    super(message)
  }
}