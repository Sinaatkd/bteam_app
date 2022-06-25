import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CopyTradeService } from 'src/app/services/copy-trade.service';
import { ModalController } from '@ionic/angular';
import { CopyTradeApiComponent } from 'src/app/components/copy-trade-api/copy-trade-api.component';

@Component({
  selector: 'app-copy-trade',
  templateUrl: './copy-trade.page.html',
  styleUrls: ['./copy-trade.page.scss'],
})
export class CopyTradePage implements OnInit {

  user: UserModel;
  isUserKucoinAPIsActive: boolean
  isCheckUserAPIsLoading = true;
  baskets: any = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  }

  constructor(
    private userService: UserService,
    private copyTradeService: CopyTradeService,
    private modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.userService.getUser().subscribe(user => {
      this.user = user;

      if (this.user.user.is_full_authentication) {
        this.copyTradeService.getBaskets().subscribe(res => {
          this.baskets = res;
        })
      }
    });
  }

  ngOnInit(): void {
    this.copyTradeService.checkUserAPIs().subscribe(res => {
      if (res.futures == 200 && res.spot == 200) {
        this.isUserKucoinAPIsActive = true;
        this.isCheckUserAPIsLoading = false;
      } else {
        this.isUserKucoinAPIsActive = false;
        this.isCheckUserAPIsLoading = false;
      }
    })
  }

  enterAPIKeys() {
    this.modalCtrl.create({
      component: CopyTradeApiComponent,
    }).then(modalEl => modalEl.present());
  }
}
