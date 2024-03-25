import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: 'home/:id', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), },
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: 'pay-booking', loadComponent: () => import('./components/pay-booking/pay-booking.page').then( m => m.PayBookingPage) }
];
