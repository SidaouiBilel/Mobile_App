import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database/database";
import {AngularFireAuth} from "angularfire2/auth/auth";

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  userinfo= {
    nom: '',
    card: '',
    ccv: '',
  };

  constructor(public navCtrl: NavController,private afauth: AngularFireAuth, public navParams: NavParams,private db: AngularFireDatabase,
              private alertCtrl:AlertController,public tc: ToastController, public lc: LoadingController) {
  }

  SendData() {
    var toast = this.tc.create({
      duration: 3000,
      position: 'buttom'
    });
    if (this.userinfo.nom == '' || !this.userinfo.card || !this.userinfo.ccv) {
      toast.setMessage('All fields Required');
      toast.present();
    }
    else if (this.userinfo.card.length != 16 || this.userinfo.ccv.length != 3) {
      toast.setMessage('Credit Card number must be composed of 16 numbers and the CVV must be composed of 3 numbers');
      toast.present();
    }
    else {
      let loader = this.lc.create({
        content: 'Please Wait'
      });
      loader.present();
      this.afauth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.db.database.ref('Users/' + user.uid + '/data/').set({
            "nom": this.userinfo.nom,
            "carte": this.userinfo.card,
            "ccv": this.userinfo.ccv
          }).then((result) => {
            loader.dismiss();
            let alert = this.alertCtrl.create({
              title: ' Informations Saved !',
              subTitle: 'Your account information were successefully submitted !!',
              buttons: [
                {
                  text: 'Great!',
                  handler: data => {
                    this.navCtrl.push('HomePage');
                  }
                }
              ]
            });
            alert.present();
          }).catch((a: Error) => {
            console.log(a);
            let alert = this.alertCtrl.create({
              title: ' Failure to save !',
              subTitle: a.message,
              buttons: [
                {
                  text: 'Try again!',
                  handler: data => {}
                }
              ]
            });
            alert.present();
          });
        }
      });
    }
  }
  sendHome() {
    this.navCtrl.setRoot('HomePage');
  }

}
