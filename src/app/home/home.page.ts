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
  constructor(private booking: BookingService, private route: ActivatedRoute, private modalController: ModalController) { }
  token = false; buttonPay = false; dataBooking: any = {}; credito = undefined; denarios = undefined; totalPayment = 0;

  ionViewWillEnter() {
    this.route.snapshot.params['id'] ? this.requestTransactionId(this.route.snapshot.params['id']) : false;
  }

  async requestTransactionId(data: any) {
    await this.booking.post('/travel/get_booking', { Id: data }).then((res: any) => {
      console.log(res);
      if (res.error == false) { this.token = true, this.dataBooking = res.data; }
    });
  }
  validateAmount() {
    this.totalPayment = 0;
    this.credito ? (this.credito > this.dataBooking.cupo ? this.totalPayment += this.dataBooking.cupo : this.totalPayment += this.credito) : false;
    this.denarios ? (this.denarios > this.dataBooking.puntos ? this.totalPayment += (this.dataBooking.puntos * 1000) : this.totalPayment += (this.denarios * 1000)) : false;
    this.totalPayment == this.dataBooking.Amount ? this.buttonPay = true : this.buttonPay = false;
  }
  async payBooking() {
    console.log('Paying booking...');
    this.booking.credito = this.credito ? (this.credito > this.dataBooking.cupo ? this.dataBooking.cupo : this.credito) : 0;
    this.booking.denarios = this.denarios ? (this.denarios > this.dataBooking.puntos ? this.dataBooking.puntos : this.denarios) : 0;
    this.booking.totalPayment = this.totalPayment; this.booking.document = this.dataBooking.Document; this.booking.bookingId = this.dataBooking.Id;
    const modal = await this.modalController.create({ component: PayBookingPage, mode: 'ios', cssClass: 'popoverStyle', });
    return await modal.present();
  }
}
