import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton]
})
export class HomePage {
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  headersWanderlust = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'denario2021' }) };
  token = false;

  ionViewWillEnter() {
    this.token = this.route.snapshot.params['id'] ? true : false;
    console.log('ionViewWillEnter: ', this.route.snapshot.params['id']);
  }

  async requestTransactionId(data: any) {
    await this.processHttpRequest('post', '/transaction', { id: data }).then((res: any) => {
      console.log(res);
    }).catch((err: any) => {
      console.log(err);
    });
  }
  processHttpRequest(method: string, path: string, body: any) {
    return new Promise((resolve, reject) => {
      switch (method.toLowerCase()) {
        case 'get':
          this.http.get('localhost:3000' + path, this.headersWanderlust).subscribe((res: any) => {
            console.log(res);
            if (res.res == "ok") {
              resolve(res.url);
            } else {
              resolve("error");
            }
          }, (err: any) => {
            reject({ error: true, data: err });
          });
          break;
        case 'post':
          this.http.post('localhost:3000' + path, body, this.headersWanderlust).subscribe((res: any) => {
            console.log(res);
            if (res.res == "ok") {
              resolve(res.url);
            } else {
              resolve("error");
            }
          }, (err: any) => {
            reject({ error: true, data: err });
          });
          break;
        default:
          break;
      }
    });
  }
}
