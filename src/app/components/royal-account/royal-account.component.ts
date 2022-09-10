import { BuySpecialAccountComponent } from './../modals/buy-special-account/buy-special-account.component';
import { SpecialAccountModel } from './../../models/specialAccount.model';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-royal-account',
  templateUrl: './royal-account.component.html',
  styleUrls: ['./royal-account.component.scss'],
})
export class RoyalAccountComponent implements OnInit, AfterViewInit {

  @Input('item') item: SpecialAccountModel
  userTransaction: UserModel['transaction'];
  detailText = 'جهت فعالسازی اشتراک خود لمس نمایید';

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService,
  ) { }

  ngAfterViewInit() {
    this.userService.getUser().subscribe( user => {
      this.userTransaction = user.transaction;
      if (this.userTransaction && this.userTransaction.is_confirmation) {
        this.detailText = 'اشتراک شما فعال است';
      }else if (this.userTransaction && !this.userTransaction.is_confirmation){
        this.detailText = 'در انتظار فعالسازی';
      }
    })
  }
  
  ngOnInit() {
    
  }

  buySpecialAccount() {
    if (!this.userTransaction) {
      this.modalCtrl.create({
        initialBreakpoint: 1,
        breakpoints: [1],
        component: BuySpecialAccountComponent,
        componentProps: {
          specialItem: this.item,
        },
        cssClass: 'modal',
        mode: 'ios',
        swipeToClose: true,
        backdropDismiss: true,
      }).then(modalEl => modalEl.present());
    }
  }
}
