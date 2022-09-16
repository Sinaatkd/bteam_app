import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NftBotPage } from './nft-bot.page';

const routes: Routes = [
  {
    path: '',
    component: NftBotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NftBotPageRoutingModule {}
