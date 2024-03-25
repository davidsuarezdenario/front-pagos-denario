import { Component } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { BookingService } from '../services/booking.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonLabel, IonInput, IonButton, ModalController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PayBookingPage } from '../components/pay-booking/pay-booking.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, CurrencyMaskModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, IonLabel, IonInput, IonButton, FormsModule]
})
export class HomePage {
  constructor(private booking: BookingService, private route: ActivatedRoute, public modalController: ModalController) { }
  /* headersWanderlust = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': 'viajesAuth' }) }; urlWanderlust = 'http://localhost:3000'; */
  token = false; buttonPay = false; dataBooking: any = {}; credito = undefined; denarios = undefined; totalPayment = 0;

  ionViewWillEnter() {
    this.route.snapshot.params['id'] ? this.requestTransactionId(this.route.snapshot.params['id']) : false;
  }

  async requestTransactionId(data: any) {
    /* await this.booking.processHttpRequest('post', '/travel/get_booking', { Id: data }).then((res: any) => { */
    await this.booking.post('/travel/get_booking', { Id: data }).then((res: any) => {
      if (res.error == false) { this.token = true, this.dataBooking = res.data; }
    });
  }
  /* processHttpRequest(method: string, path: string, body: any) {
    return new Promise((resolve, reject) => {
      switch (method.toLowerCase()) {
        case 'get':
          this.http.get(this.urlWanderlust + path, this.headersWanderlust).subscribe((res: any) => {
            console.log(res);
            resolve(res);
          }, (err: any) => {
            reject({ error: true, data: err });
          });
          break;
        case 'post':
          this.http.post(this.urlWanderlust + path, body, this.headersWanderlust).subscribe((res: any) => {
            console.log(res);
            resolve(res);
          }, (err: any) => {
            reject({ error: true, data: err });
          });
          break;
        default:
          break;
      }
    });
  } */
  validateAmount() {
    this.totalPayment = 0;
    this.credito ? (this.credito > this.dataBooking.cupo ? this.totalPayment += this.dataBooking.cupo : this.totalPayment += this.credito) : false;
    this.denarios ? (this.denarios > this.dataBooking.puntos ? this.totalPayment += (this.dataBooking.puntos * 1000) : this.totalPayment += (this.denarios * 1000)) : false;
    this.totalPayment == this.dataBooking.Amount ? this.buttonPay = true : this.buttonPay = false;
  }
  async payBooking() {
    console.log('Paying booking...');
    const modal = await this.modalController.create({ component: PayBookingPage, mode: 'ios', cssClass: 'popoverStyle', });
    return await modal.present();
  }
}
