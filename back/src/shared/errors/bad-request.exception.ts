import {CustomException} from "./custom-exception";

export class BadRequestException extends CustomException {
  httpCode = 400;
  httpError = 'Bad Request';
  constructor(message?: string) {
    super(message);
  }
}