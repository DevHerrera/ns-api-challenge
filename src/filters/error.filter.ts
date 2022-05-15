import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import {
  ExceptionFilter,
  UnauthorizedException,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
  Logger,
  HttpStatus,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalResponseError } from './global.response.error';
@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = (exception as any).message.message;
    let code = 'HttpException';
    Logger.error(
      message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case UnauthorizedException:
        status = HttpStatus.UNAUTHORIZED;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;

      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        break;
      case NotFoundException:
        status = HttpStatus.NOT_FOUND;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case EntityNotFoundError:
        status = HttpStatus.NOT_FOUND;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case ForbiddenException:
        status = HttpStatus.FORBIDDEN;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;
      case ConflictException:
        status = HttpStatus.CONFLICT;
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        break;

      default:
    }
    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
