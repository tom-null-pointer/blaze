import {CustomException} from "./custom-exception";

export class NotFoundException extends CustomException {
  httpCode = 404;
  httpError = 'Resource not found.';
  constructor(message?: string) {
    super(message);
  }
}