import { Siswa } from './../../models/siswa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailSiswaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-siswa',
  templateUrl: 'detail-siswa.html',
})
export class DetailSiswaPage {
  public siswa: Siswa

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.siswa = navParams.get("siswa")
    console.log("Data received : ", JSON.stringify(this.siswa))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailSiswaPage');
  }

}
