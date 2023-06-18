import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the access token from your authentication service or any other source
    const accessToken = localStorage.getItem("access_token");

    // Clone the request and add the authorization header
    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log("interceptor : header => ", authRequest);
    // Pass the modified request to the next handler
    return next.handle(authRequest);
  }
}
