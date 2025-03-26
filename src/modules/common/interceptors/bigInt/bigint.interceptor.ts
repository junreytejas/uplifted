import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data) {
          return;
        }
        return JSON.parse(
          JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value,
          ),
        );
      }),
    );
  }
}

@Injectable()
export class WsLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const client = context.switchToWs().getClient(); // Get WebSocket client
    const data = context.switchToWs().getData(); // Get WebSocket message data

    console.log('Incoming WebSocket message:', data, client.id);

    return next.handle().pipe(
      tap((outgoingMessage) => {
        console.log('Outgoing WebSocket message:', outgoingMessage);
      }),
    );
  }
}
