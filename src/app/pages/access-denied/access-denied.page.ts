import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { CopyTradeService } from 'src/app/services/copy-trade.service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.page.html',
  styleUrls: ['./access-denied.page.scss'],
})
export class AccessDeniedPage implements OnInit {

  stageId = 0;
  
  constructor(
    private copyTradeService: CopyTradeService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.stageId = parseInt(params.get('stageId'), 0);
    });

  }

  onPay() {
    this.loadingCtrl.create({ mode: 'ios', message: 'لطفا صبر کنید' }).then(loadingEl => {
      loadingEl.present()
      this.copyTradeService.createInvoice(this.stageId).subscribe(res => {
        loadingEl.dismiss();
        window.location.href = res.invoice_url;
      });
    })
  }

}
