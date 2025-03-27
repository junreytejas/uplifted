import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { handleErrorResponse } from '../../helpers/handleErrorResponse';
import { parseStringToObject } from '../../helpers/parseStringToObject';
import {
  transformFilterKeysToPrisma,
  transformOrderKeysToPrisma,
} from '../../helpers/transformKeysToPrisma';
@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    try {
      const httpRequest = context.switchToHttp().getRequest();
      const { method, body } = httpRequest;

      // Log the request information
      if (method != 'GET') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password } = body;
      }

      const {
        page = 1,
        limit = 10,
        $filter,
        $orderBy,
        ...rest
      } = httpRequest.query;

      httpRequest.$filter = $filter
        ? transformFilterKeysToPrisma(parseStringToObject($filter))
        : undefined;

      httpRequest.$orderBy = $orderBy
        ? transformOrderKeysToPrisma(parseStringToObject($orderBy))
        : undefined;

      httpRequest.pagination = {
        skip: (page - 1) * limit,
        take: parseInt(limit, 10),
        page,
      };

      httpRequest.contextParams = rest;

      console.warn('request:', httpRequest.originalUrl);

      return next.handle().pipe(map((request) => request));
    } catch (error) {
      throw handleErrorResponse(error);
    }
  }
}
