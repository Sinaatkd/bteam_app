import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyTradePage } from './copy-trade.page';

const routes: Routes = [
  {
    path: '',
    component: CopyTradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyTradePageRoutingModule {}
