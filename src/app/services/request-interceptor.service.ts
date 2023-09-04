import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(private securityService: KeycloakService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.securityService.getToken()).pipe(
      mergeMap((auth: string | null) => {
        if (auth) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${auth}`
            }
          });
        }
        return next.handle(req);
      })
    );
  }
}