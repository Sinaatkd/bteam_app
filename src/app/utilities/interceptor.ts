import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(Storage.get({ key: 'token' })).pipe(map((token: { value: string }) => {
            if (token !== null && token.value !== null) {
                return req.clone({
                    url: req.url,
                    headers: req.headers
                        .append('Authorization', 'Token ' + token.value),
                    withCredentials: false
                });
            } else {
                return req.clone({
                    url: req.url,
                    headers: req.headers,
                    withCredentials: false
                });
            }
        }), switchMap((request: HttpRequest<any>) => {
            return next.handle(request).pipe(tap(() => { },
                (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.router.navigate(['login']);
                    }
                }));;
        }));
    }
}