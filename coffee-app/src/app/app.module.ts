import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {GeolocationService} from './geolocation.service';
import {DataService} from './data.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';
import {MaterialModule} from '../../material.module';
import { ListComponent } from './list/list.component';
import { CoffeeComponent } from './coffee/coffee.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


const routs: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'coffee',
    component: CoffeeComponent
  },
  {
    path: 'coffee/:id',
    component: CoffeeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CoffeeComponent
  ],
  imports: [
    RouterModule.forRoot(routs),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [GeolocationService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
