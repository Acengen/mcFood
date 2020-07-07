import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FakeAuth } from './FakeAuth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private fakeAuth: FakeAuth, private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.fakeAuth.isAuth().then((authenticate: boolean) => {
      if (authenticate) {
        return true;
      } else {
        return this.route.navigate(['/']);
      }
    });
  }
}
