import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database/database";
import {BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner";

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  options: BarcodeScannerOptions;
  //Scanned from the camera
  result: boolean = false;

  hisuid: string;
  //Data of the user  you'll send money to
  datas: {
    nom: '',
    carte: '',
    ccv: ''
  };
  //your data
  mydata: {
    nom: '',
    carte: '',
    ccv: ''
  };
  //his
  cartaz: {
    solde: ''
  };
  //yours
  mycard: {
    solde: ''
  };

  amount: string ="";

  constructor(private alertctrl: AlertController,public lc: LoadingController,public tctrl: ToastController,
              public navCtrl: NavController,private db:AngularFireDatabase,private barcode: BarcodeScanner,
              public navParams: NavParams,private alertCtrl: AlertController) {
      //Bringing My DATA
      this.db.object('/Users/' + localStorage.getItem("uid") + "/data").forEach((item) => {
        this.mydata = item;
      }).catch((error) => {console.log(error.message);});
      setTimeout(() => {
        this.db.list('Credit_Cards', {
          query: {
            orderByChild: 'carte',
            equalTo: +this.mydata.carte
          }
        }).subscribe((data) => {
          this.mycard = data[0];
        }, (error) => {
          alert(error.message)
        });
       },3000);
      //BRINGING HIS DATA

  }



  async scanBarcode() {
    this.options = {
      prompt: 'Scan to send money',
      showFlipCameraButton: true,
    };
    await this.barcode.scan(this.options).then((data) => {
      if ( ! data.cancelled) {
        this.db.object('/Users/' + data.text + "/data").forEach((item) => {
          this.hisuid = data.text;
          this.datas = item;
          this.result = true;
          console.log(this.datas);
        }).catch((error) => alert("Error: can't access to database"+error.message));
        setTimeout(() => {
          this.db.list('Credit_Cards', {
            query: {
              orderByChild: 'carte',
              equalTo: +this.datas.carte
            }
          }).subscribe((data) => {
            this.cartaz = data[0];
          }, (error) => {
            alert(error.message)
          });
        },3000);
      }
    }).catch((err:Error)=> {let alert = this.alertctrl.create({
      title: 'An error has Occurred due to camera malfunction',
      subTitle: err.message,
      buttons: [
        {
          text: 'Ok',
          handler: data => {}
        }
      ]
    });
      alert.present();
    });

  }

  sendMoney() {
    const ct = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log(ct);
    //Get your info
    let toaster = this.tctrl.create({
      duration: 3000,
      position: 'bottom'
    });
    let loads = this.lc.create({
      content: 'Adding Money'
    });
    //Transaction
    const mnt = +this.amount;
    console.log(mnt);
    if ( mnt > +this.mycard.solde ) {
      toaster.setMessage('Your credits are insufficient');
      toaster.present();
    }
    else {
      //zid mina na9is mina !
      //Zidou howa
      let sum = +this.cartaz.solde + mnt;
      //na9esli ena
      let som = +this.mycard.solde - mnt;

      loads.present().then(() => {
        this.db.list('/Credit_Cards', {
          query: {
            orderByChild: 'carte',
            equalTo: this.datas.carte
          }
        }).subscribe((data) => {
          this.db.list('/Credit_Cards').update(data[0].$key, {solde: sum});
          console.log("success");
        });
        loads.dismiss();
      });
      setTimeout(() => {
        let loade = this.lc.create({
          content: 'Substracting money'
        });
        loade.present().then(() => {
          this.db.list('/Credit_Cards', {
            query: {
              orderByChild: 'carte',
              equalTo: this.mydata.carte
            }
          }).subscribe((data) => {
            this.db.list('/Credit_Cards').update(data[0].$key, {solde: som});
          });
          loade.dismiss();
        });
      },1200);
      let loadp = this.lc.create({
        content: 'Registring the transactions'
      });
      loadp.present().then(() => {
        //zidha fi transactions
        this.db.database.ref('Users/' + localStorage.getItem("uid") + '/transactions/sent').push({
          "receiver": this.datas.carte,
          "ammount": this.amount,
          "date": ct
        }).then(() => {loadp.dismiss()}).catch((err) => {console.log(err);loadp.dismiss()});});

        let loadzz = this.lc.create({
          content: 'Registring the transactions'
        });
        loadzz.present().then(()=>{
        this.db.database.ref('Users/' + this.hisuid + '/transactions/received').push({
          "sender": this.mydata.carte,
          "ammount": this.amount,
          "date": ct
        }).then(()=> {loadzz.dismiss()}).catch((err) => {console.log(err);loadzz.dismiss()});
        });
        toaster.setMessage("The transaction was a success");
        toaster.present();
        this.result = false;
    }

  }

  async genbar() {
    const result = await this.barcode.encode(this.barcode.Encode.TEXT_TYPE, localStorage.getItem('uid')).catch((err) => console.log(err));
  }
}
