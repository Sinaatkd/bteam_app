import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyTradePage } from './copy-trade.page';

const routes: Routes = [
  {
    path: '',
    component: CopyTradePage
  },
  {
    path: 'education',
    loadChildren: () => import('./education/education.module').then( m => m.EducationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyTradePageRoutingModule {}
