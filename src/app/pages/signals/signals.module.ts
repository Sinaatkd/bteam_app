import { SharedModule } from 'src/app/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignalsPageRoutingModule } from './signals-routing.module';

import { SignalsPage } from './signals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignalsPageRoutingModule,
    SharedModule,
  ],
  declarations: [SignalsPage]
})
export class SignalsPageModule {}
