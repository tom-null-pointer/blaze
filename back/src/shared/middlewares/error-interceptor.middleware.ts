import {CustomException} from "../errors/custom-exception";
import {Request, Response} from "express";
import {HttpErrorResponse} from "../responses/http-error.response";
import httpStatus from "http-status";
import {InternalServerException} from "../errors/internal-server.exception";

export function errorInterceptorMiddleware(err: Error | CustomException, req: Request, res: Response, next: Function) {
  console.error(err);
  const errorResponse = new HttpErrorResponse(
    httpStatus.INTERNAL_SERVER_ERROR,
    'Internal Server Error.',
  );
  if (err instanceof CustomException) {
    errorResponse.code = err.httpCode;
    errorResponse.error = err.httpError;
    errorResponse.message = err.message;
  }
  if (err instanceof InternalServerException) { delete err.e; }
  res
    .status(errorResponse.code)
    .send(errorResponse);
  next();
}