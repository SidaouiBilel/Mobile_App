import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResetpassPage } from './resetpass';

@NgModule({
  declarations: [
    ResetpassPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetpassPage),
  ],
  exports: [
    ResetpassPage
  ]
})
export class ResetpassPageModule {}
