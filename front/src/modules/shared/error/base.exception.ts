export class BaseException extends Error {
  userMessage: string;
  mainError?: unknown
  constructor(userMessage: string, message: string, e?: unknown) {
    super(message)
    this.userMessage = userMessage;
    this.mainError = e;
  }
}