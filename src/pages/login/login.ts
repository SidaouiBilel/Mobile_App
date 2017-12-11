import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth/auth";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(public navCtrl: NavController,private lc:LoadingController, public navParams: NavParams,private afauth: AngularFireAuth,private alertCtrl:AlertController) {
  }

  async Login(user: User) {
    let loader = this.lc.create({
      content: 'Please Wait'
    });
    loader.present();
      await this.afauth.auth.signInWithEmailAndPassword(user.email, user.password).then((result) => {
        loader.dismiss();
        localStorage.setItem("uid",result.uid);

        let alert = this.alertCtrl.create({
          title: 'Logged In !',
          subTitle: "You were successfully logged in!",
          buttons: [
            {
              text: 'Ok',
              handler: data => {this.navCtrl.setRoot('HomePage');}
            }
          ]
        });
        alert.present();}).catch((a:Error) => {let alert = this.alertCtrl.create({
        title: 'Login Failed !',
        subTitle: a.message,
        buttons: [
          {
            text: 'Ok',
            handler: data => {this.navCtrl.setRoot('LoginPage');}
          }
        ]
      });
        alert.present();
        loader.dismiss();});
  }

  Resetpass() {
    this.navCtrl.push('ResetpassPage');
  }

  Register() {
    this.navCtrl.push('RegisterPage');
  }

}
