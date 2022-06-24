import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CopyTradePageRoutingModule } from './copy-trade-routing.module';

import { CopyTradePage } from './copy-trade.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CopyTradePageRoutingModule,
    SharedModule
  ],
  declarations: [CopyTradePage]
})
export class CopyTradePageModule {}
