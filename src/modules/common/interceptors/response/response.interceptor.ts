import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { URLSearchParams } from 'url';

export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  dateTime?: string;
  count?: number;
  totalPages?: number;
  currentPage?: number;
  previousPage?: number;
  nextPage?: number;
  currentPageUrl?: string;
  previousPageUrl?: string;
  nextPageUrl?: string;
  currentPageNumber?: number;
  customData?: any;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const httpResponse = context.switchToHttp().getResponse();
    const httpRequest = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((response) => {
        if (!response) {
          throw new NotFoundException();
        }
        const pagination = httpRequest.pagination;
        const endpoint = httpResponse.req.url;
        // const contextParams = httpRequest.query;

        const currentPage = new URLSearchParams(endpoint);

        const currentPageNumber = Number(pagination.page);
        currentPage.set('page', `${currentPageNumber + 1}`);
        currentPage.set('limit', `${pagination.take}`);
        // const currentPageString = currentPage.toString();

        const nextPage = new URLSearchParams(endpoint);
        nextPage.set('page', `${currentPageNumber + 1}`);
        nextPage.set('limit', `${pagination.take}`);
        // const nextPageString = nextPage.toString();

        const previousPage = new URLSearchParams(endpoint);
        previousPage.set('page', `${currentPageNumber - 1}`);
        previousPage.set('limit', `${pagination.take}`);
        // const previousPageString = `${previousPage}`;

        const count = response?.count
          ? response.count
          : Array.from(response).length || Object.length;

        const totalPages = Math.ceil(count / pagination.take);

        const dateTime = new Date().toLocaleDateString('en-gb', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: 'numeric',
          hourCycle: 'h24',
          timeZone: 'America/New_York',
        });

        if (response.error) {
          console.log({
            endpoint,
            dateTime,
            response,
          });
        }

        // remove count from response object
        // typeof response === 'object' ? delete response?.count : response;
        // typeof response?.data === 'object'
        //   ? delete response?.data?.count
        //   : response;

        console.log(pagination);
        const apiResponse: ApiResponse<T> = {
          dateTime,
          statusCode: httpResponse?.statusCode,
          message: httpResponse?.message,
          count,
          totalPages,
          // currentPageUrl: currentPageString,
          // nextPageUrl:
          //   currentPageNumber < totalPages ? nextPageString : undefined,
          // previousPageUrl:
          //   currentPageNumber > 1 ? previousPageString : undefined,
          currentPage: currentPageNumber,
          previousPage:
            currentPageNumber > 1 ? currentPageNumber - 1 : undefined,
          nextPage:
            currentPageNumber < totalPages ? currentPageNumber + 1 : undefined,
          customData: response.customData || undefined,
          data: response?.data || response,
        };
        console.log({
          endpoint,
          dateTime,
        });
        return apiResponse;
      }),
    );
  }
}
