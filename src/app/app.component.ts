import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireAuth} from "angularfire2/auth/auth";
import { Keyboard } from 'ionic-native';

@Component({
  templateUrl: 'app.html',

})
export class MyApp {

  rootPage:any;



  constructor(private platform: Platform, statusBar: StatusBar, private af: AngularFireAuth,Splashscreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      if (Splashscreen) {
        setTimeout(() => {
          Splashscreen.hide();
        }, 100);
      }
      Keyboard.disableScroll(true);
    });
    this.af.auth.onAuthStateChanged((user) => {
      if(user) {
        this.rootPage = 'HomePage';
      } else {
        this.rootPage = 'LoginPage';
      }
    });
  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(true);
    });
  }

  ionViewWillLeave() {
    this.platform.ready().then(() => {
      Keyboard.disableScroll(false);
    });
  }

}

