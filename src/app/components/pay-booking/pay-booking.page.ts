import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';
import { TycPage } from '../tyc/tyc.page';

@Component({
  selector: 'app-pay-booking',
  templateUrl: './pay-booking.page.html',
  styleUrls: ['./pay-booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PayBookingPage implements OnInit {
  constructor(public booking: BookingService) { }
  resultSimulate: any = undefined; revision = false;

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Paying booking...', this.booking.document, this.booking.credito, this.booking.denarios, this.booking.totalPayment, this.booking.bookingId);
    if (this.booking.credito > 0) { this.simulateCredit() }
  }
  async simulateCredit() {
    await this.booking.post('/denario/simulate_credit', { Document: this.booking.document, Amount: this.booking.credito }).then((res: any) => {
      console.log(res);
      res.error == false ? this.resultSimulate = res.data : this.resultSimulate = undefined;
    });
  }
  counter(i: number) { return new Array(i); }
  firmar() {
    if(this.booking.termCond == true){
      if(this.booking.credito > 0){
        console.log('Firmar credito...');
        this.revision = true;
      } else {
        console.log('Firmar denarios... proceder a pagar');
      }
    } else {
      this.booking.presentAlert('Alerta!', 'Al solicitar', 'Para solicitar tu crédito debes leer y aceptar Términos & Condiciones.');
    }

  }
  async termCondConfirm() {
    console.log('TermCondConfirm...');
    const modal = await this.booking.modalController.create({ component: TycPage, mode: "ios", cssClass: 'popoverStyle' });
    return await modal.present();
  }
}
