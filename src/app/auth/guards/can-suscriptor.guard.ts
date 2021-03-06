import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CanSuscriptorGuard implements CanActivate {
  constructor( private authSvc: AuthService,
               private toastr: ToastrService ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user): boolean => user! && this.authSvc.isSuscriptor(user)),
      tap((canSus) => {
        if (!canSus) {
          this.toastr.error('Must have permission to manage data.', 'Access denied!');
        }
      })
    );
  }
}
