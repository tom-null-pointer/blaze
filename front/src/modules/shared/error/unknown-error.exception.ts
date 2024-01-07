import {BaseException} from "./base.exception";

export class UnknownErrorException extends BaseException {
  private readonly DEFAULT_UNKNOWN_ERROR_MESSAGE = 'Sorry, we are having some issues. Please, try again later.'
  constructor(message: string, mainError: unknown, userMessage: string = '') {
    super(userMessage, message, mainError);
    this.userMessage = userMessage ? userMessage : this.DEFAULT_UNKNOWN_ERROR_MESSAGE;
  }
}