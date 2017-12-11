import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FCM } from '@ionic-native/fcm';
import { MyApp } from './app.component';
import {AngularFireModule} from "angularfire2";
import {Firebase_Auth} from "./app.firebase.config";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database/database.module";
import {Keyboard} from "@ionic-native/keyboard";
import { QRCodeModule } from 'angular2-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    AngularFireModule.initializeApp(Firebase_Auth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    QRCodeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Keyboard,
    FCM,
    BarcodeScanner
  ]
})
export class AppModule {}
