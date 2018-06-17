import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailSiswaPage } from './detail-siswa';

@NgModule({
  declarations: [
    DetailSiswaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailSiswaPage),
  ],
})
export class DetailSiswaPageModule {}
