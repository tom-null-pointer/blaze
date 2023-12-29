import {CustomError} from "./custom-error";

export class BadRequestException extends CustomError {
  httpCode = 400;
  httpError = 'Bad Request';
  constructor(message?: string) {
    super(message);
  }
}