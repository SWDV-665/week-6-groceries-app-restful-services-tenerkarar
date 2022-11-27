import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroceriesServiceService } from './groceries-service.service';
import { InputDialogServiceService } from './input-dialog-service.service';
import { Share } from '@capacitor/share';
import { Tab1Page } from './tab1/tab1.page'; 
 import {File} from '@ionic-native/file/ngx';

import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy ,}],
  bootstrap: [AppComponent],
})
export class AppModule {}
