import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignalsPage } from './signals.page';

const routes: Routes = [
  {
    path: '',
    component: SignalsPage
  },
  {
    path: 'user-manula',
    loadChildren: () => import('./user-manula/user-manula.module').then( m => m.UserManulaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalsPageRoutingModule {}
