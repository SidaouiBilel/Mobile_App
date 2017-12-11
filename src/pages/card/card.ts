import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database/database";

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  private segment = "transactions";

  private segment2 = "sent";

  datas: {
    nom: '',
    carte: '',
    ccv: ''
  };
  //sent: {
  //  "receiver": '',
  //  "ammount": '',
  //  "date": ''
 // };
 // received: {
  //  "sender": '',
  //  "ammount": '',
  //  "date": ''
 // };
  _sent: any;
  _received: any;
  cartaz: {
    solde: ''
  };
  uid = localStorage.getItem('uid');

  constructor(public navCtrl: NavController,public lc: LoadingController,private db:AngularFireDatabase, public navParams: NavParams) {
    let loadi = this.lc.create({content: 'Please Wait'});
    loadi.present().then(()=>{
      this.db.list('/Users/' + localStorage.getItem("uid") + "/transactions/sent").subscribe((data) => {this._sent = data});
        /*.forEach((item) => {console.log(item);
        if(item["sent"] != null) {
          console.log(item["sent"]);
          this._sent = item["sent"];
        }
        if(item["received"] != null) {
          this._received = item["received"];
        }
      }).catch((error) => {console.log(error.message);loadi.dismiss()});*/
      loadi.dismiss();});
  }

  loadit() {
    if (this.segment == "card") {
      let load = this.lc.create({content: 'Please Wait'});
      load.present().then(()=>{
      this.db.object('/Users/' + localStorage.getItem("uid") + "/data").forEach((item) => {
        this.datas = item
      }).catch((error) => {console.log(error.message);load.dismiss()});
      load.dismiss();});
      setTimeout(() => {
        let loader = this.lc.create({content: 'Please Wait'});
        loader.present().then(() => {
          this.db.list('Credit_Cards', {
            query: {
              orderByChild: 'carte',
              equalTo: +this.datas.carte
            }
          }).subscribe((data) => {
            this.cartaz = data[0];
            loader.dismiss()
          });
        })
      }, 5000);
    }
  }

  loadres() {
    let loadpi = this.lc.create({content: 'Please Wait'});
    loadpi.present().then(()=>{
      this.db.list('/Users/' + localStorage.getItem("uid") + "/transactions/received").subscribe((data) => {this._received = data});
      loadpi.dismiss();});
  }

}
