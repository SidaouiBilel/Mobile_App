import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth/auth";


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user ={} as User;
  constructor(public navCtrl: NavController,public tctrl: ToastController,public lc: LoadingController
    , public navParams: NavParams,private afauth: AngularFireAuth,private alertCtrl: AlertController) {
  }

  async Login() {
    var toaster = this.tctrl.create({
      duration: 3000,
      position: 'bottom'
    });
        if (this.user.email == '' || this.user.password == '') {
          toaster.setMessage('All Fields Are Required');
          toaster.present();
        }
        else if (this.user.password.length < 6) {
          toaster.setMessage('Password is too weak');
          toaster.present();
        }
        else {
          let loader = this.lc.create({
            content: 'Please Wait'
          });
          loader.present();
       await this.afauth.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
         this.afauth.auth.currentUser.sendEmailVerification();
         //success
         this.afauth.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then((result) => {

           localStorage.setItem("uid",result.uid);}
         ).catch((error:Error) => {
           //failure
           console.log("something happened")});
         //Alert the success of registration
         loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Account Created !',
        subTitle: 'Your account was successefully created !!',
        buttons: [
          {
            text: 'Great',
            handler: data => {this.navCtrl.push('InfoPage');}
          }
        ]
      });
      alert.present();

    }).catch((a:Error) => {
         let alert = this.alertCtrl.create({
           title: 'Registration Failed !',
           subTitle: a.message,
           buttons: [
             {
               text: 'Ok',
               handler: data => {this.navCtrl.setRoot('RegisterPage');}
             }
           ]
         });
         alert.present();
         loader.dismiss();
       });
    }}

  goBack() {
    this.navCtrl.setRoot('LoginPage');
  }
}
