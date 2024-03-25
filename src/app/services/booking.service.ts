import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }
  headersWanderlust = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': 'viajesAuth' }) }; urlWanderlust = 'http://localhost:3000';

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
}
