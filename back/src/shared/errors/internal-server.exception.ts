import {CustomException} from "./custom-exception";

export class InternalServerException extends CustomException {
  httpCode = 500;
  httpError = 'Internal Server Error.';

  e?: unknown;

  constructor(message?: string, e?: unknown) {
    super(message);
    this.e = e;
  }
}