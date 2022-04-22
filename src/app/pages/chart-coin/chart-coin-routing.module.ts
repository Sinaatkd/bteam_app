import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartCoinPage } from './chart-coin.page';

const routes: Routes = [
  {
    path: '',
    component: ChartCoinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartCoinPageRoutingModule {}
