import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAdminGuard } from './auth/guards/can-admin.guard';
import { CanLoggedInGuard } from './auth/guards/can-loggedIn.guard';
import { CanSuscriptorGuard } from './auth/guards/can-suscriptor.guard';
import { SendEmailComponent } from './auth/send-email/send-email.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
    canActivate: [CanLoggedInGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
    canActivate: [CanLoggedInGuard],
  },
  {
    path: 'verification-email',
    component: SendEmailComponent,
    canActivate: [CanLoggedInGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [CanAdminGuard],
  },
  {
    path: 'suscriptor',
    loadChildren: () =>
      import('./suscriptor/suscriptor.module').then((m) => m.SuscriptorModule),
    canActivate: [CanSuscriptorGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
