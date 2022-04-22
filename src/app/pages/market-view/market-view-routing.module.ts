import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketViewPage } from './market-view.page';

const routes: Routes = [
  {
    path: '',
    component: MarketViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketViewPageRoutingModule {}
