import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserManulaPage } from './user-manula.page';

const routes: Routes = [
  {
    path: '',
    component: UserManulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManulaPageRoutingModule {}
