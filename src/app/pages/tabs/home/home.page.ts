import {StoryService} from './../../../services/story.service';
import {BASE_URL} from './../../../utilities/variables';
import {UserService} from './../../../services/user.service';
import {FearAndGreedComponent} from './../../../components/modals/fear-and-greed/fear-and-greed.component';
import {ModalController, NavController} from '@ionic/angular';
import {BannerService} from './../../../services/banner.service';
import {SignalsService} from 'src/app/services/signals.service';
import {SpecialAccountModel} from './../../../models/specialAccount.model';
import {SpecialAccountService} from './../../../services/special-account.service';
import {NewsService} from './../../../services/news.service';
import {NewsModel} from './../../../models/news.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading = true;
  stories = [];
  news: NewsModel[] = [];
  user;
  BASE_URL = BASE_URL;
  specialAccountItems: SpecialAccountModel[] = [];
  generalStats;
  banners;
  coinSymbol = '';
  isSearchBarActive = false;

  slideOpts = {
    slidesPerView: 1,
    autoplay: true,
    speed: 1000
  };

  storySlideOpts = {
    slidesPerView: 3.5,
  };

  services = [
    {
      col: '6',
      src: '/assets/pages/tabs/home/services/signals.png',
      route: '/signals',
    },
    {
      col: '6',
      src: '/assets/pages/tabs/home/services/copy-trade.png',
      route: '/copy-trade',
    },
    {
      col: '6',
      src: '/assets/pages/tabs/home/services/news.png',
      route: '/news',
    },
    {
      col: '6',
      src: '/assets/pages/tabs/home/services/education.png',
      route: '/education',
    },
    {
      col: '12',
      src: '/assets/pages/tabs/home/services/nft-bot.png',
      route: '/nft-bot',
    },
  ]

  constructor(
    private newsService: NewsService,
    private specialAccountService: SpecialAccountService,
    private bannerService: BannerService,
    private signalsService: SignalsService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private userService: UserService,
    private storyService: StoryService
  ) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    if (this.isLoading) {
      this.storyService.getStories().subscribe((stories) => {
        this.stories = stories;
        this.bannerService.getBanners().subscribe((banners) => {
          this.banners = banners;
          this.newsService.getAllNews('all').subscribe((news) => {
            this.news = news;
            this.specialAccountService
              .getAllSpecialAccountItems()
              .subscribe((items) => {
                this.specialAccountItems = items;
                this.signalsService
                  .getSignalsGeneralStats()
                  .subscribe((generalStats) => {
                    this.generalStats = generalStats;
                    this.isLoading = false;
                  });
              });
          });
        });
      });
    }
  }

  ionViewWillEnter() {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  getUserFirstName() {
    return this.user.user.full_name.split(' ')[0];
  }

  ionViewDidLeave() {
    this.isLoading = true;
  }

  openFearAndGreedModal() {
    this.modalCtrl
      .create({
        component: FearAndGreedComponent,
        cssClass: 'modal',
        breakpoints: [1, 0],
        initialBreakpoint: 1,
      })
      .then((modalEl) => modalEl.present());
  }

  onSearchCoinForShowChart() {
    this.navCtrl.navigateForward(`/chart-coin/${this.coinSymbol}`);
  }

  activeSearchBar() {
    this.isSearchBarActive = !this.isSearchBarActive;
  }
}
