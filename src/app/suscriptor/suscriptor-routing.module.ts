import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuscriptorComponent } from './suscriptor.component';

const routes: Routes = [{ path: '', component: SuscriptorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuscriptorRoutingModule { }
