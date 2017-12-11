import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth/auth";
import {AngularFireDatabase} from "angularfire2/database/database";
import {FirebaseListObservable} from "angularfire2/database/firebase_list_observable";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private email: string;
  private rst: boolean = false;
  items: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,
  private afauth: AngularFireAuth, private db:AngularFireDatabase,private tc: ToastController) {
  }



  logout() {
    let confirm = this.alertCtrl.create({
      title: 'Logging out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {}
        },
        {
          text: 'Ok',
          handler: () => {
            localStorage.removeItem("uid");
            this.afauth.auth.signOut();
            this.navCtrl.setRoot('LoginPage');
          }
        }
      ]
    });
    confirm.present();

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
            handler: data => {
              localStorage.removeItem("uid");
              this.afauth.auth.signOut();
              this.navCtrl.setRoot('LoginPage');}
          }
        ]
      });
      alert.present();
    }).catch(
      (err) => {toast.setMessage('Please verify the email you entered!');
        toast.present();
        setTimeout(() => {this.navCtrl.setRoot('HomePage')},3000)
      }
    );
  }

  chnge() {
    if (this.rst == false) {
      this.rst = true;}
    else {
      this.rst = false;}
  }


}
