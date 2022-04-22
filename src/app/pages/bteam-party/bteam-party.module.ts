import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BteamPartyPageRoutingModule } from './bteam-party-routing.module';

import { BteamPartyPage } from './bteam-party.page';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BteamPartyPageRoutingModule,
    SharedModule
  ],
  declarations: [BteamPartyPage]
})
export class BteamPartyPageModule {}
