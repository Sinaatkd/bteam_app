import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare const TradingView: any;

@Component({
  selector: 'app-chart-coin',
  templateUrl: './chart-coin.page.html',
  styleUrls: ['./chart-coin.page.scss'],
})
export class ChartCoinPage implements OnInit {


  coinSymbol: string
  deviceWidth = 100
  deviceHeight = 100

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.coinSymbol = params.symbol
    });
  }

  ionViewDidEnter() {
    new TradingView.widget(
      {
        "width": "100%",
        "height": "100%",
        "symbol": `BINANCE:${this.coinSymbol}USDT`,
        "timezone": "Etc/UTC",
        "theme": "DARK",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "withdateranges": true,
        "range": "ytd",
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "no_referral_id": true,
        "container_id": "tradingview_bac65"
      }
    );
  }
}
