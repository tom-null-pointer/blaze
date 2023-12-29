export class CronJobException extends Error {
  constructor(message?: string) {
    super(message);
  }
}