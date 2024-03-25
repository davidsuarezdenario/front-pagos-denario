import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-pay-booking',
  templateUrl: './pay-booking.page.html',
  styleUrls: ['./pay-booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PayBookingPage implements OnInit {

  constructor(private booking: BookingService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('Paying booking...', this.booking.document, this.booking.credito, this.booking.denarios, this.booking.totalPayment, this.booking.bookingId);
  }

}
