import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CopyTradePageRoutingModule } from './copy-trade-routing.module';

import { CopyTradePage } from './copy-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CopyTradePageRoutingModule
  ],
  declarations: [CopyTradePage]
})
export class CopyTradePageModule {}
