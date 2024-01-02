import {CustomError} from "./custom-error";

export class InternalServerException extends CustomError {
  httpCode = 500;
  httpError = 'Internal Server Error.';

  e?: unknown;

  constructor(message?: string, e?: unknown) {
    super(message);
    this.e = e;
  }
}