import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, public modalController: ModalController, public alertController: AlertController) { }
  headersWanderlust = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': 'viajesAuth' }) }; urlWanderlust = 'http://localhost:3000';
  bookingId = 0; document = '0'; credito = 0; denarios = 0; totalPayment = 0; termCond = false;

  async get(url: string) {
    const headers = this.headersWanderlust.headers;
    const observable = this.http.get(this.urlWanderlust + url, { headers: headers });
    return lastValueFrom(observable);
  }
  async post(url: string, data: any) {
    const headers = this.headersWanderlust.headers;
    const observable = this.http.post(this.urlWanderlust + url, data, { headers: headers });
    return lastValueFrom(observable);
  }
  async presentAlert(titulo: string, subtitulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      mode: 'ios', translucent: true, header: titulo, subHeader: subtitulo, message: mensaje, buttons: ['OK']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
