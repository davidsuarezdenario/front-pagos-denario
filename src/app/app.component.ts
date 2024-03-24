import { Component } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, HttpClientModule, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
