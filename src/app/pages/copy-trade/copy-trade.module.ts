import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CopyTradePageRoutingModule } from './copy-trade-routing.module';

import { CopyTradePage } from './copy-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgPersianDatepickerModule,
    ReactiveFormsModule,
    CopyTradePageRoutingModule
  ],
  declarations: [CopyTradePage]
})
export class CopyTradePageModule {}
