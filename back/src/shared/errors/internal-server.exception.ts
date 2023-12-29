import {CustomError} from "./custom-error";

export class InternalServerException extends CustomError {
  httpCode = 500;
  httpError = 'Internal Server Error.';

  constructor(message?: string) {
    super(message);
  }
}