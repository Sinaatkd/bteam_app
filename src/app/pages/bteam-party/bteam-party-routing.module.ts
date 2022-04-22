import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BteamPartyPage } from './bteam-party.page';

const routes: Routes = [
  {
    path: '',
    component: BteamPartyPage
  },
  {
    path: 'user-manual',
    loadChildren: () => import('./user-manual/user-manual.module').then( m => m.UserManualPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BteamPartyPageRoutingModule {}
