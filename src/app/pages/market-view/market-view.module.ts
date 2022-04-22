import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketViewPageRoutingModule } from './market-view-routing.module';

import { MarketViewPage } from './market-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketViewPageRoutingModule
  ],
  declarations: [MarketViewPage]
})
export class MarketViewPageModule {}
