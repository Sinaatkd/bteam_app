import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NftBotPageRoutingModule } from './nft-bot-routing.module';

import { NftBotPage } from './nft-bot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NftBotPageRoutingModule
  ],
  declarations: [NftBotPage]
})
export class NftBotPageModule {}
