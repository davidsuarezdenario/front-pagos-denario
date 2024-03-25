import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'home/:id', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'pay-booking', loadComponent: () => import('./components/pay-booking/pay-booking.page').then( m => m.PayBookingPage) },
  { path: 'tyc', loadComponent: () => import('./components/tyc/tyc.page').then( m => m.TycPage) }
];
