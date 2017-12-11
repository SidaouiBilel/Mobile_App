import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database/database";
import {AngularFireAuth} from "angularfire2/auth/auth";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  tab1Root = 'CardPage';
  tab2Root = 'ScanPage';
  tab3Root = 'ProfilePage';

  constructor(public navCtrl: NavController,private afd: AngularFireDatabase,private afauth: AngularFireAuth) {
  }

}
