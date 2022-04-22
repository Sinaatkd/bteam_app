import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartCoinPageRoutingModule } from './chart-coin-routing.module';

import { ChartCoinPage } from './chart-coin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartCoinPageRoutingModule
  ],
  declarations: [ChartCoinPage]
})
export class ChartCoinPageModule {}
