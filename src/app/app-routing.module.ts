import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotLoadAuthPage } from './guards/not-load-auth-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'login-or-register',
    loadChildren: () => import('./pages/auth/login-or-register/login-or-register.module').then( m => m.LoginOrRegisterPageModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then( m => m.EducationPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'signals',
    loadChildren: () => import('./pages/signals/signals.module').then( m => m.SignalsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/auth/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule)
  },
  {
    path: 'market-view',
    loadChildren: () => import('./pages/market-view/market-view.module').then( m => m.MarketViewPageModule)
  },
  {
    path: 'bteam-party',
    loadChildren: () => import('./pages/bteam-party/bteam-party.module').then( m => m.BteamPartyPageModule)
  },
  {
    path: 'chart-coin/:symbol',
    loadChildren: () => import('./pages/chart-coin/chart-coin.module').then( m => m.ChartCoinPageModule)
  },
  {
    path: 'copy-trade',
    loadChildren: () => import('./pages/copy-trade/copy-trade.module').then( m => m.CopyTradePageModule)
  },
  {
    path: 'access-denied/:stageId',
    loadChildren: () => import('./pages/access-denied/access-denied.module').then( m => m.AccessDeniedPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
