import { CashWithdrawalComponent } from './bteam-party/cash-withdrawal/cash-withdrawal.component';
import { UseBlueCardComponent } from './bteam-party/use-blue-card/use-blue-card.component';
import { UseBlackCardComponent } from './bteam-party/use-black-card/use-black-card.component';
import { ShowResultComponent } from './bteam-party/show-result/show-result.component';
import { UseRedCardComponent } from './bteam-party/use-red-card/use-red-card.component';
import { FearAndGreedComponent } from './modals/fear-and-greed/fear-and-greed.component';
import { SignalNewsComponent } from './signal-news/signal-news.component';
import { LoadnigComponent } from './loadnig/loadnig.component';
import { EfficiencyComponent } from './efficiency/efficiency.component';
import { NewsDetailComponent } from './../pages/news/news-detail/news-detail.component';
import { SpotSignalComponent } from './spot-signal/spot-signal.component';
import { FuturesSignalComponent } from './futures-signal/futures-signal.component';
import { BuySpecialAccountComponent } from './modals/buy-special-account/buy-special-account.component';
import { NewsComponent } from './news/news.component';
import { RoyalAccountComponent } from './royal-account/royal-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../services/auth/login.service';
import { LoginWithPhoneNumberComponent } from './auth/login-with-phone-number/login-with-phone-number.component';
import { LoginWithPasswordComponent } from './auth/login-with-password/login-with-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SendReceiptComponent } from './modals/send-receipt/send-receipt.component';
import { GiftComponent } from './gift/gift.component';
import { DiscountComponent } from './discount/discount.component';
import { RoyalButtonComponent } from './modals/royal-button/royal-button.component';
import { FullAuthenticationComponent } from './auth/full-authentication/full-authentication.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { CopyTradeApiComponent } from './copy-trade-api/copy-trade-api.component';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgPersianDatepickerModule,
    ],
    declarations: [
        LoginWithPasswordComponent,
        LoginWithPhoneNumberComponent,
        RoyalAccountComponent,
        NewsComponent,
        BuySpecialAccountComponent,
        SendReceiptComponent,
        GiftComponent,
        DiscountComponent,
        FuturesSignalComponent,
        SpotSignalComponent,
        NewsDetailComponent,
        EfficiencyComponent,
        RoyalButtonComponent,
        LoadnigComponent,
        SignalNewsComponent,
        FearAndGreedComponent,
        UseRedCardComponent,
        UseBlueCardComponent,
        UseBlackCardComponent,
        ShowResultComponent,
        CashWithdrawalComponent,
        FullAuthenticationComponent,
        CopyTradeApiComponent
    ],
    exports: [
        LoginWithPasswordComponent,
        LoginWithPhoneNumberComponent,
        RoyalAccountComponent,
        NewsComponent,
        BuySpecialAccountComponent,
        SendReceiptComponent,
        GiftComponent,
        DiscountComponent,
        FuturesSignalComponent,
        SpotSignalComponent,
        CashWithdrawalComponent,
        EfficiencyComponent,
        RoyalButtonComponent,
        LoadnigComponent,
        SignalNewsComponent,
        FearAndGreedComponent,
        UseRedCardComponent,
        UseBlueCardComponent,
        UseBlackCardComponent,
        ShowResultComponent,
        FullAuthenticationComponent,
        CopyTradeApiComponent
    ],
    providers: [
        LoginService,
    ]
})
export class SharedModule { }
