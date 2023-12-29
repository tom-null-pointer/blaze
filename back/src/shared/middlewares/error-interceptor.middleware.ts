import {CustomError} from "../errors/custom-error";
import {Request, Response} from "express";
import {HttpErrorResponse} from "../responses/http-error.response";
import httpStatus from "http-status";

export function errorInterceptorMiddleware(err: Error | CustomError, req: Request, res: Response, next: Function) {
  console.error(err);
  const errorResponse = new HttpErrorResponse(
    httpStatus.INTERNAL_SERVER_ERROR,
    httpStatus['500_MESSAGE'],
  );
  if (err instanceof CustomError) {
    errorResponse.code = err.httpCode;
    errorResponse.error = err.httpError;
    errorResponse.message = err.message;
  }
  res
    .status(errorResponse.code)
    .send(errorResponse);
  next();
}