import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pay-booking',
  templateUrl: './pay-booking.page.html',
  styleUrls: ['./pay-booking.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PayBookingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

}
