import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth/auth";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-resetpass',
  templateUrl: 'resetpass.html',
})
export class ResetpassPage {
  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afauth:AngularFireAuth
  ,public tc: ToastController,public alertCtrl: AlertController) {
  }
  passreset() {
    let toast = this.tc.create({
      duration: 3000,
      position: 'buttom'
    });
    firebase.auth().sendPasswordResetEmail(this.email).then((result) => {
      let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'An email has been sent! Please verify your email box.',
        buttons: [
          {
            text: 'Ok',
            handler: data => {this.navCtrl.setRoot('LoginPage');}
          }
        ]
      });
      alert.present();
    }).catch(
      (err) => {toast.setMessage('Please verify the email you entered!');
      toast.present();
      setTimeout(() => {this.navCtrl.setRoot('LoginPage')},3000)
      }
    );
  }
  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }
}
