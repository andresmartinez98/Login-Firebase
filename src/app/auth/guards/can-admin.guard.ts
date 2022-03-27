import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanAdminGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user): boolean => user! && this.authSvc.isAdmin(user)),
      tap((canAdmin) => {
        if (!canAdmin) {
          window.alert('Access denied. Must have permission to manage data.');
        }
      })
    );
  }
}
