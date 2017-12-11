import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardPage } from './card';
import { QRCodeModule } from 'angular2-qrcode';


@NgModule({
  declarations: [
    CardPage,
  ],
  imports: [
    IonicPageModule.forChild(CardPage),
    QRCodeModule
  ],
  exports: [
    CardPage
  ]
})
export class CardPageModule {}
