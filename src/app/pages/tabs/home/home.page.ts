import { FearAndGreedComponent } from './../../../components/modals/fear-and-greed/fear-and-greed.component';
import { ModalController, NavController } from '@ionic/angular';
import { BannerService } from './../../../services/banner.service';
import { SignalsService } from 'src/app/services/signals.service';
import { SpecialAccountModel } from './../../../models/specialAccount.model';
import { SpecialAccountService } from './../../../services/special-account.service';
import { NewsService } from './../../../services/news.service';
import { NewsModel } from './../../../models/news.model';
import { Component, OnInit } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading = true;
  news: NewsModel[] = [];
  specialAccountItems: SpecialAccountModel[] = [];
  generalStats;
  banner
  coinSymbol = ''

  slideOpts = {
    slidesPerView: 1,
    autoplay: true,
  }
  constructor(
    private newsService: NewsService,
    private specialAccountService: SpecialAccountService,
    private bannerService: BannerService,
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  ionViewDidEnter() {
    if (this.isLoading) {
      this.newsService.threeLastNewsConnection();
      this.bannerService.getBanner().subscribe(banner => {
        this.banner = banner;
        this.newsService.getThreeLastNews().subscribe(news => {
          this.news = news;
          this.specialAccountService.getAllSpecialAccountItems().subscribe(items => {
            this.specialAccountItems = items;
            this.signalsService.getSignalsGeneralStats().subscribe(generalStats => {
              this.generalStats = generalStats
              this.isLoading = false;
            })
          });
        });
      });
    }
  }

  ionViewDidLeave() {
    this.isLoading = true;
  }
  
  openFearAndGreedModal() {
    this.modalCtrl.create({
      component: FearAndGreedComponent,
      cssClass: 'modal',
      breakpoints: [1, 0],
      initialBreakpoint: 1
    }).then(modalEl => modalEl.present());
  }

  onSearchCoinForShowChart() {
      this.navCtrl.navigateForward(`/chart-coin/${this.coinSymbol}`)
  }  
}
