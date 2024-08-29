import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.authService.accessToken 
    ) {
      const newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.authService.accessToken}`
        ),
      });

      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
