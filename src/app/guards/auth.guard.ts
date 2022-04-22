import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(Storage.get({ key: 'token' })).pipe(map((token: { value: string }) => {
      if (token !== null && token.value !== null) {
        return true;
      } else {        
        this.router.navigate(['login-or-register']);
        return false
      }
    }))
  }
}
