import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class CanLoggedInGuard implements CanActivate {
  constructor( private authSvc: AuthService, 
               private router: Router ){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user): boolean => !user!),
      tap((canLoggedIn) => {
        if (!canLoggedIn) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
