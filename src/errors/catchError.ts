import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import AppError from './AppErrors';
import { PrismaErrors, StatusCodes } from './knownErrors';
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

const catchError = <T>(fn: () => Promise<T>): Promise<T> => {
  return fn.apply(this).catch((err) => {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === PrismaErrors.PUNIQUE) {
        throw new ForbiddenException('Credentials taken');
      }

      if (err.code === PrismaErrors.PNOTFOUND) {
        throw new UnauthorizedException('Invalid email or password');
      }
    }

    if (err instanceof AppError) {
      if (err.statusCode === StatusCodes.UNAUTHORIZED) {
        throw new UnauthorizedException(err.message);
      }

      if (err.statusCode === StatusCodes.FORBIDDEN) {
        throw new ForbiddenException(err.message);
      }

      if (err.statusCode === StatusCodes.NOTFOUND) {
        throw new NotFoundException(err.message);
      }
    }

    throw new InternalServerErrorException('Something went wrong');
  });
};

export default catchError;
