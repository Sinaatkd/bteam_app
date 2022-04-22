import { SpecialAccountService } from './../../../services/special-account.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../../../components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
  ],
  providers: [
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
