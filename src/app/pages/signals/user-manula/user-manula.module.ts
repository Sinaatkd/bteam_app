import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserManulaPageRoutingModule } from './user-manula-routing.module';

import { UserManulaPage } from './user-manula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserManulaPageRoutingModule
  ],
  declarations: [UserManulaPage]
})
export class UserManulaPageModule {}
