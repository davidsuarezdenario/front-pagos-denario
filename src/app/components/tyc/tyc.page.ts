import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-tyc',
  templateUrl: './tyc.page.html',
  styleUrls: ['./tyc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TycPage implements OnInit {

  constructor(public booking: BookingService) { }

  ngOnInit() {
  }

  aceptarTyc() { this.booking.modalController.dismiss(); this.booking.termCond = true; }
  rechazarTyc() { this.booking.modalController.dismiss(); this.booking.termCond = false; }
}
